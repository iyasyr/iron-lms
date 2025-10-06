import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import AuthSplitLayout from "../../shared/ui/AuthSplitLayout";
import { useAuth } from "../../shared/lib/AuthContext";


const schema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] });


type Form = z.infer<typeof schema>;


const SPLINE_URL = "https://my.spline.design/squarechipsfallinginplace-1phkABU3JGmivVWAN0Q6OU9J/";


export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: doRegister, loading } = useAuth();
  const navigate = useNavigate();


  const { register, handleSubmit, formState: { errors } } = useForm<Form>({ resolver: zodResolver(schema) });


  const onSubmit = async (data: Form) => {
    await doRegister(data.email, data.password, data.fullName);
    navigate("/dashboard");
  };

  return (
    <AuthSplitLayout splineUrl={SPLINE_URL}>
      <div className="authCard">
        <div className="authCard__header">
          <h1>Create your account</h1>
          <p>Join us and start your journey</p>
        </div>


        <form className="authCard__form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="field">
            <label className="label" htmlFor="fullName">Full name</label>
            <div className="inputWrap">
              <User className="inputIcon" size={18} />
              <input id="fullName" {...register("fullName")} type="text" placeholder="Ada Lovelace" className={`input ${errors.fullName ? "isError" : ""}`} autoComplete="name" />
            </div>
            {errors.fullName && <p className="errorMsg">{errors.fullName.message}</p>}
          </div>


          <div className="field">
            <label className="label" htmlFor="email">Email</label>
            <div className="inputWrap">
              <Mail className="inputIcon" size={18} />
              <input id="email" {...register("email")} type="email" placeholder="you@company.com" className={`input ${errors.email ? "isError" : ""}`} autoComplete="email" />
            </div>
            {errors.email && <p className="errorMsg">{errors.email.message}</p>}
          </div>


          <div className="field">
            <label className="label" htmlFor="password">Password</label>
            <div className="inputWrap">
              <Lock className="inputIcon" size={18} />
              <input id="password" {...register("password")} type={showPassword ? "text" : "password"} placeholder="Create a password" className={`input ${errors.password ? "isError" : ""}`} autoComplete="new-password" />
              <button type="button" onClick={() => setShowPassword(v => !v)} className="toggleBtn" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            {errors.password && <p className="errorMsg">{errors.password.message}</p>}
          </div>


          <div className="field">
            <label className="label" htmlFor="confirmPassword">Confirm password</label>
            <div className="inputWrap">
              <Lock className="inputIcon" size={18} />
              <input id="confirmPassword" {...register("confirmPassword")} type={showConfirmPassword ? "text" : "password"} placeholder="Repeat your password" className={`input ${errors.confirmPassword ? "isError" : ""}`} autoComplete="new-password" />
              <button type="button" onClick={() => setShowConfirmPassword(v => !v)} className="toggleBtn" aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}>{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            {errors.confirmPassword && <p className="errorMsg">{errors.confirmPassword.message}</p>}
          </div>


          <button type="submit" disabled={loading} className="submitBtn">
            {loading ? <span className="spinner" /> : <><span>Create account</span><ArrowRight size={18} /></>}
          </button>


          <p className="helperText">Already have an account? <Link to="/login">Sign in</Link></p>
        </form>
      </div>
    </AuthSplitLayout>
  );
}