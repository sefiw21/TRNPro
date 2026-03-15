import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@react-oauth/google";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider.tsx";
import type { ApiResponse, User } from "../../types/index.ts";
import { setAccessToken } from "../../utils/tokenUtils.ts";
import { type SignupSchemaType, signUpSchema } from "./schemas.tsx";
import { userAPI } from "./service/auth.service.ts";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (formData: SignupSchemaType) => {
      setApiError(null);
      setSuccessMessage(null);
      setIsSubmitting(true);
      try {
        const response: ApiResponse<User> = await userAPI.createUser(formData);
        if (response.success && response.user) {
          if (response.token) {
            console.log("response.token from register:", response.token);
            login(response.token, response.user);
          }
          setSuccessMessage(
            `Peace be with you, ${response.user.fullName}. Account created.`,
          );
          reset();
          navigate("/Home");
        } else {
          setApiError(response.error || response.message || "Process failed");
        }
      } catch (error: any) {
        const errorMsg =
          error.response?.data?.message ||
          "Connection error. Please try again.";
        setApiError(errorMsg);
      } finally {
        setIsSubmitting(false);
      }
    },
    [navigate, reset, login],
  );

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const googleToken = tokenResponse.access_token;
      const response: ApiResponse<User> =
        await userAPI.googleLogin(googleToken);
      if (response.success && response.user) {
        console.log("response from google login :", response);
        console.log("response.token:", response.token);

        // 1. Extract the data into clean variables first (this makes TypeScript happy)
        // Note: Depending on your API, this might be response.data.token instead of response.token
        const token = response.token;
        const userData = response.user;

        // 2. Check that BOTH exist before logging in
        if (token && userData) {
          // TypeScript now perfectly understands that 'token' is a string
          // and 'userData' is a User object. No ghost functions needed!
          login(token, userData);
        } else {
          // Optional: Handle the case where the backend failed to send a token
          console.error(
            "Login failed: Missing token or user data from backend",
          );
        }

        console.log("Token set in context:", token);
        setSuccessMessage(
          `Peace be with you, ${response.user.fullName}. Account created.`,
        );
        setTimeout(() => {
          reset();
          setAccessToken(response.token);
          navigate("/Home");
        }, 2000);
      }
    },
    onError: () => setApiError("Google authentication failed"),
  });

  // Reusable Error Icon Component for a cleaner codebase
  const ErrorIcon = () => (
    <svg
      className="w-3.5 h-3.5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#020617] from-blue-900/20 via-[#020617] to0 py-12 px-4 flex flex-col justify-center items-center">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-md w-full relative z-10 bg-black/40 backdrop-blur-xl rounded-3xl shadow-[0_0_50px_-12px_rgba(37,99,235,0.2)] border border-blue-900/30 p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold tracking-tight text-white mb-2 italic">
            Sign <span className="text-blue-500">up</span>
          </h2>
          <div className="h-1 w-12 bg-blue-600 mx-auto rounded-full mb-4"></div>
          <p className="text-blue-300/70 text-sm font-light tracking-widest ">
            well come
          </p>
        </div>

        {/* Global Status Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/50 rounded-xl text-center">
            <p className="text-blue-400 text-sm font-medium">
              {successMessage}
            </p>
          </div>
        )}

        {apiError && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/50 rounded-xl text-center flex items-center justify-center gap-2">
            <ErrorIcon />
            <p className="text-rose-400 text-sm font-medium">{apiError}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name Field */}
          <div className="group">
            <label className="block text-xs font-semibold text-blue-400  tracking-tighter mb-2 ml-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName", {})}
              className={`w-full px-5 py-4 bg-white/5 text-white border ${errors.fullName ? "border-rose-500/50 focus:ring-rose-500/50" : "border-blue-900/50 focus:ring-blue-500/50 focus:border-blue-400"} rounded-2xl focus:outline-none focus:ring-2 transition-all placeholder:text-slate-600`}
              placeholder="Your Name"
              disabled={isSubmitting}
            />
            {/* Proper Error Placement */}
            {errors.fullName && (
              <p className="text-rose-400 text-[11px] font-medium mt-2 ml-2 flex items-center gap-1.5 animate-pulse">
                <ErrorIcon />
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email/Phone Field */}
          <div className="group">
            <label className="block text-xs font-semibold text-blue-400  tracking-tighter mb-2 ml-1">
              Contact Detail
            </label>
            <input
              type="email"
              {...register("email", {
                // required: "Email or Phone is required",
              })}
              autoComplete="off"
              className={`w-full px-5 py-4 bg-white/5 text-white border ${errors.email ? "border-rose-500/50 focus:ring-rose-500/50" : "border-blue-900/50 focus:ring-blue-500/50 focus:border-blue-400"} rounded-2xl focus:outline-none focus:ring-2 transition-all placeholder:text-slate-600`}
              placeholder="Email or Phone"
              disabled={isSubmitting}
            />
            {/* Proper Error Placement */}
            {errors.email && (
              <p className="text-rose-400 text-[11px] font-medium mt-2 ml-2 flex items-center gap-1.5 animate-pulse">
                <ErrorIcon />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="group">
            <label className="block text-xs font-semibold text-blue-400  tracking-tighter mb-2 ml-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", {})}
              autoComplete="new-password"
              className={`w-full px-5 py-4 bg-white/5 text-white border ${errors.password ? "border-rose-500/50 focus:ring-rose-500/50" : "border-blue-900/50 focus:ring-blue-500/50 focus:border-blue-400"} rounded-2xl focus:outline-none focus:ring-2 transition-all placeholder:text-slate-600`}
              placeholder="••••••••"
              disabled={isSubmitting}
            />
            {/* Proper Error Placement */}
            {errors.password && (
              <p className="text-rose-400 text-[11px] font-medium mt-2 ml-2 flex items-center gap-1.5 animate-pulse">
                <ErrorIcon />
                {errors.password.message}
              </p>
            )}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">
            Do have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-medium underline-offset-4 hover:underline"
            >
              Log In
            </Link>
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-4 px-6 rounded-2xl font-bold text-white bg-blue-700 hover:bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create account"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center justify-center space-x-4">
          <span className="text-blue-500 text-xs font-bold tracking-tighter">
            OR
          </span>
        </div>
        {apiError && (
          <p className="text-rose-400 text-center text-sm font-medium mt-4 animate-pulse">
            {apiError}
          </p>
        )}
        {/* Google Button */}
        <button
          type="button"
          onClick={() => googleLogin()}
          className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-slate-100 hover:bg-white text-slate-900 rounded-2xl font-bold transition-all active:scale-[0.97] shadow-lg"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google Fast-Entry
        </button>
      </div>

      {/* Footer Info */}
      <p className="mt-8 text-green-600 text-[10px]  tracking-[0.2em] font-bold">
        &bull; Debre Selam v1.0
      </p>
    </div>
  );
};

export default SignUp;
