import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import AuthSplitLayout from "../../shared/ui/AuthSplitLayout";
import { useAuth } from "../../shared/lib/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


type Form = z.infer<typeof schema>;


const SPLINE_URL = "https://my.spline.design/squarechipsfallinginplace-1phkABU3JGmivVWAN0Q6OU9J/";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();


  const { register, handleSubmit, formState: { errors } } = useForm<Form>({ resolver: zodResolver(schema) });


  const onSubmit = async (data: Form) => {
    await login(data.email, data.password);
    navigate("/dashboard");
  };


  return (
    <AuthSplitLayout splineUrl={SPLINE_URL}>
      <div className="authCard">
        <div className="authCard__header">
          <h1>Sign in</h1>
          <p>We're happy to see you again</p>
        </div>


        <form className="authCard__form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
              <input id="password" {...register("password")} type={showPassword ? "text" : "password"} placeholder="Your password" className={`input ${errors.password ? "isError" : ""}`} autoComplete="current-password" />
              <button type="button" onClick={() => setShowPassword(v => !v)} className="toggleBtn" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            {errors.password && <p className="errorMsg">{errors.password.message}</p>}
          </div>


          <button type="submit" disabled={loading} className="submitBtn">
            {loading ? <span className="spinner" /> : <><span>Sign in</span><ArrowRight size={18} /></>}
          </button>


          <p className="helperText">No account? <Link to="/register">Create one</Link></p>
        </form>
      </div>
    </AuthSplitLayout>
  );
}