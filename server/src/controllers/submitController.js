const submission = require("../models/submission");
const Problem = require("../models/Problem");
const { getIdByLanguage, submitBatch, submitToken, statusIdValue } = require("../utils/ProblemUtlis");

const submitProblems = async (req, res) => {
  try {
    const userId = req.user._id;
    const problemId = req.params.id;
    const { code, language } = req.body;

    if (!userId || !problemId || !code || !language) {
      return res.status(400).send("Some field missing");
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(400).send("No problem found");
    }

    const submittedResult = await submission.create({
      userId,
      problemId,
      code,
      status: "pending",
      language,
      testCasesPassed: 0,
      testcasesTotal: problem.hiddenTestCases.length,
    });

    const languageId = getIdByLanguage(language);

    const submissions = problem.hiddenTestCases.map((testcase) => ({
      source_code: code,
      language_id: languageId,
      stdin: testcase.input,
      expected_output: testcase.output,
    }));

    const getToken = await submitBatch(submissions);
    const getResult = await submitToken(getToken);

    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let allPassed = true;
    let errorMessage = null;
    let status = "accepted";

    for (const oneResult of getResult) {
      if (oneResult.status_id === 3) {
        testCasesPassed++;
        runtime += parseFloat(oneResult.time || 0);
        memory = Math.max(memory, oneResult.memory || 0);
      } else {
        allPassed = false;
        const error =
          oneResult.stderr || oneResult.compile_output || oneResult.message || "Unknown Error";
        errorMessage = error;
        status = statusIdValue(oneResult.status_id);
      }
    }

    if (!allPassed) {
      status = statusIdValue(getResult.find(r => r.status_id !== 3)?.status_id || 6); // fallback to Compilation Error
    }

    submittedResult.status = status;
    submittedResult.testCasesPassed = testCasesPassed;
    submittedResult.errorMessage = errorMessage;
    submittedResult.runtime = runtime;
    submittedResult.memory = memory;

    await submittedResult.save();

    res.status(201).send(submittedResult);
  } catch (err) {
  console.error("Submission Error:", err);
  const errorMsg =
    err?.message || JSON.stringify(err) || "Something went wrong during submission.";
  res.status(500).send({ error: errorMsg });
}

};

module.exports = { submitProblems };
