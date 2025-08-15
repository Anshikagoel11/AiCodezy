import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser , clearError} from "../redux/authSlicer";
import { useDispatch, useSelector } from "react-redux";
import LoadingDots from "../Ui/loadingdots";
import * as z from "zod";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import toast from "react-hot-toast";

const SignInSchema = z.object({
  emailId: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});


export default function SignIn() {
  const dispatch = useDispatch();
  const { isAuthenticated ,loading,error} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successfully")
      navigate("/");
    }
  }, [isAuthenticated,navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  const handelError = ()=>{
    dispatch(clearError())
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
  });

  
  return (
    <div className="sm:p-6 md:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
        Welcome back
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 sm:space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-orange-400/90 mb-1 sm:mb-2">
            Email
          </label>
          <input
            {...register("emailId")}
            type="email"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#1a1a1a]/70 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent text-sm sm:text-base"
            placeholder="email@example.com"
            onFocus={handelError}
          />
          {errors.emailId && (
            <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.emailId.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-orange-400/90 mb-1 sm:mb-2">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#1a1a1a]/70 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ornage-500/50 focus:border-transparent text-sm sm:text-base"
            placeholder="••••••••"
            onFocus={handelError}
          />
          {errors.password && (
            <div className="mt-1 text-xs sm:text-sm text-red-500 space-y-1">
              {errors.password.message
                ?.toString()
                .split("\n")
                .map((line, i) => (
                  <p key={i} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {line}
                  </p>
                ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <a
            href="#"
            className="text-xs sm:text-sm text-orange-400 hover:text-orange-300"
          >
            Forgot password?
          </a>
        </div>

 {error && (
        <p className= 'mt-1 text-xs sm:text-sm text-red-500 space-y-1 text-center'>
          Invalid Credientials
        </p>
      )}
        <motion.button
          type="submit"
          whileHover={!loading ? { scale: 1.02 } : {}}
          whileTap={!loading ? { scale: 0.98 } : {}}
          className={`w-full py-2 sm:py-3 px-4 ${
            loading 
              ? "bg-ornage-700" 
              : "bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-900 "
          } text-white font-medium rounded-lg shadow-lg relative overflow-hidden group text-sm sm:text-base`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center p-2">
              <LoadingDots />
            </div>
          ) : (
            <span className="relative z-10 text-black">Sign In</span>
          )}
          {!loading && (
            <span className="absolute inset-0 bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-900  group-hover:opacity-100 transition-opacity duration-300"></span>
          )}
        </motion.button>
      </form>
    </div>
  );
}
