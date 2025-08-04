import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const SignupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^(?=.*[A-Za-z])[A-Za-z0-9_]+$/, "Must contain letters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Requires uppercase letter")
    .regex(/[a-z]/, "Requires lowercase letter")
    .regex(/\d/, "Requires number")
    .regex(/[!@#$%^&*]/, "Requires special character"),
});

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  return (
    <div className="sm:p-6 md:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
        Create your account
      </h2>

      <form
        onSubmit={handleSubmit((data)=>console.log(data))}
        className="space-y-3 sm:space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-blue-400/90 mb-1 sm:mb-2">
            Username
          </label>
          <input
            {...register("username")}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#1a1a1a]/70 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm sm:text-base"
            placeholder="username"
          />
          {errors.username && (
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
              {errors.username.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-400/90 mb-1 sm:mb-2">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#1a1a1a]/70 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm sm:text-base"
            placeholder="email@example.com"
          />
          {errors.email && (
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
              {errors.email.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-400/90 mb-1 sm:mb-2">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#1a1a1a]/70 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm sm:text-base"
            placeholder="••••••••"
          />
          {errors.password && (
            <div className="mt-1 text-xs sm:text-sm text-red-500 space-y-1">
              {errors.password.message
                ?.toString()
                .split("\n")
                .map((line, i) => (
                  <p key={i} className="items-center">
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

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 sm:py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg shadow-lg relative overflow-hidden group text-sm sm:text-base"
        >
          <span className="relative z-10">Sign Up</span>
          <span className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-700 to-blue-900 group-hover:opacity-100 transition-opacity duration-300"></span>
        </motion.button>
      </form>
    </div>
  );
}
