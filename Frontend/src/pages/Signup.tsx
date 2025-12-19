import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import axios from "axios";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../config";

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSignUp = async () => {
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/users/register`, {
        username,
        email,
        password,
      });

      console.log(response.data.message);
      console.log(response.data.user);
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border border-gray-200 min-w-80 p-8 shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            Create an Account
          </h1>
          <p className="text-slate-500 mt-2">
            Welcome! Please enter your details.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            ref={usernameRef}
            placeholder="Username"
            label="Username"
            type="text"
          />
          <Input
            ref={emailRef}
            placeholder="Email"
            label="Email"
            type="email"
          />
          <Input
            ref={passwordRef}
            placeholder="Password"
            type="password"
            label="Password"
          />

          <div className="pt-4">
            <Button
              onClick={handleSignUp}
              varient="primary"
              text={loading ? `Signing up...` : `Sign up`}
              className={`w-full ${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={loading}
            />
          </div>
        </div>

        <div className="text-center mt-4 text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-purple-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
