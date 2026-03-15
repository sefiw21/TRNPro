import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider.tsx";
import type { ApiResponse, User } from "../../types/index.ts";
import { loginSchema, type LoginSchemaType } from "./schemas.tsx";
import { userAPI } from "./service/auth.service.ts";

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = useCallback(
    async (user: LoginSchemaType) => {
      setIsSubmitting(true);
      setApiError("");
      try {
        const response: ApiResponse<User> = await userAPI.login(user);
        if (response.success && response.user) {
          if (response.token) {
            console.log("Login successful! User data:", response.user);
            login(response.token, response.user);
          }
        }
        reset();
        navigate("/Home");
      } catch (error) {
        setApiError("Invalid email or password .");
        console.error("Login error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [reset],
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold tracking-tight text-white mb-2 italic">
            Welcome <span className="text-blue-500">back</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Please enter your details to log in
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              // autoComplete="off"
              placeholder="name@company.com"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
            />
            {errors.email && (
              <p className="text-rose-400 text-[11px] font-medium mt-2 ml-2 flex items-center gap-1.5 animate-pulse">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              autoComplete="new-password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
            />
            {errors.password && (
              <p className="text-rose-400 text-[11px] font-medium mt-2 ml-2 flex items-center gap-1.5 animate-pulse">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-semibold rounded-xl 
                   shadow-lg shadow-blue-500/20 transition-all duration-200 mt-2"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>
        {apiError && (
          <p className="text-rose-400 text-center text-sm font-medium mt-4 animate-pulse">
            {apiError}
          </p>
        )}
        {/* Footer Link */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-300 font-medium underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
