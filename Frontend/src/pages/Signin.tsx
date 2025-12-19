import Button from "../components/Button";
import Input from "../components/Input";

const Signin = () => {
  return (
    <div className="h-screen w-screen bg-slate-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border border-gray-200 min-w-80 p-8 shadow-lg w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800">Sign In</h1>
          <p className="text-slate-500 mt-2">Welcome back to Second Brain</p>
        </div>

        <div className="flex flex-col gap-6">
          <Input placeholder="example@gmail.com" label="Email" />

          <Input placeholder="123456" type="password" label="Password" />

          <div className="pt-4">
            <Button varient="primary" text="Sign In" className="w-full" />
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-slate-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-purple-600 hover:underline font-medium"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signin;
