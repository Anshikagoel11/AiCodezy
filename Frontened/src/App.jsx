import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AuthPage from "./auth/authPage";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "./redux/authSlicer";
import { useEffect } from "react";
import Home from "./pages/Home";
import Cursor from "./Ui/cursor";
import Navbar from "./pages/navbar";
import AllProblems from "./pages/allProblems";
import ProblemPage from "./pages/problemPage";
import { Toaster } from "react-hot-toast";
import LoadingDots from "./Ui/loadingdots";
import {fetchDailyProblem} from './redux/dailyproblemSlicer'

function App() {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchDailyProblem())
  }, [dispatch]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
        <LoadingDots size="lg" />
      </div>
    );
  }

  return (
    <>
      <Cursor />
      {currentPath !== "/auth" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />}
        />
        <Route path="/problems" element={<AllProblems />} />
        <Route path="/problem/:id" element={<ProblemPage />} />
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #374151",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#1F2937", 
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#1F2937",
            },
          },
        }}
      />
    </>
  );
}

export default App;
