
const axios = require('axios');
require('dotenv').config();


const waitOneSec = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Waiting for a second...');
      resolve();
    }, time);
  });
};


const getIdByLanguage=(lang)=>{
    const languageWithId = {
        "c++":54,
        "java":62,
        "javascript":63,
    }
    return languageWithId[lang.toLowerCase()];
}



const submitBatch = async (submissions) => {
  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: { base64_encoded: 'false' },
    headers: {
      'x-rapidapi-key': process.env.judge0_key,
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: { submissions }
  };

  try {
    console.log(0)
    const response = await axios.request({ ...options, timeout: 10000 });
    console.log(1)
    console.log('response from submit batch in try is : ',response)
    console.log(2)
    // return array of tokens only
    return response.data;
  } catch (error) {
    console.error("Error in submitBatch:", error.message);
    throw error;
  }
};


const submitToken = async (getToken) => {
 
  
  const tokens = getToken.map((obj) => obj.token);
 

  const options = {
    method: 'GET',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
      tokens: tokens.join(','),
      base64_encoded: 'false',
      fields: '*'
    },
    headers: {
      'x-rapidapi-key': process.env.judge0_key,
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
    }
  };

  let retryCount = 0;
  const maxRetries = 10; // 10 seconds total wait

  while (retryCount < maxRetries) {
    try {
      const response = await axios.request(options);
      const result = response.data.submissions;

      const allCompleted = result.every((obj) => obj.status_id > 2);
      if (allCompleted) return result;

      retryCount++;
      await waitOneSec(1000);

    } catch (error) {
      console.error("Error fetching Judge0 submission result:", error.message);
      throw error;
    }
  }

  throw new Error("Timeout: Judge0 did not return complete results in time");
};

const statusIdValue = (statusId)=>{
    const codeExecutionResult={
  1: "In Queue",
  2: "Processing",
  3: "Accepted",
  4: "Wrong Answer",
  5: "Time Limit Exceeded",
  6: "Compilation Error",
  7: "Runtime Error (SIGSEGV)",
  8: "Runtime Error (SIGXFSZ)",
  9: "Runtime Error (SIGFPE)",
  10: "Runtime Error (SIGABRT)",
  11: "Runtime Error (NZEC)",
  12: "Runtime Error (Other)",
  13: "Internal Error",
  14: "Exec Format Error"
    }
    return codeExecutionResult[statusId];
}


module.exports={getIdByLanguage,submitBatch,submitToken,statusIdValue};