import { useRef, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const Signin = () => {
  const [loading, setLoading] = useState(false);

  const { refresh } = useAuth();

  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    setLoading(true);

    try {
      await axios.post(
        `${BACKEND_URL}/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      await refresh();
      navigate("/dashboard");
    } catch (error) {
      console.error(`Error signing...`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border border-gray-200 min-w-80 p-8 shadow-lg w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800">Sign In</h1>
          <p className="text-slate-500 mt-2">Welcome back to Second Brain</p>
        </div>

        <div className="flex flex-col gap-6">
          <Input
            ref={emailRef}
            placeholder="example@gmail.com"
            label="Email"
            type="email"
          />

          <Input
            ref={passwordRef}
            placeholder="123456"
            type="password"
            label="Password"
          />

          <div className="pt-4">
            <Button
              onClick={handleLogin}
              varient="primary"
              text={loading ? `Signing...` : "Sign in"}
              className={`w-full ${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={loading}
            />
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
