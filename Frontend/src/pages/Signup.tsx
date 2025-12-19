import Button from "../components/Button";
import Input from "../components/Input";

const Signup = () => {

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
          <Input placeholder="Username" label="Username" />
          <Input placeholder="Email" label="Email" type="email" />
          <Input placeholder="Password" type="password" label="Password" />

          <div className="pt-4">
            <Button
              varient="primary"
              text="Sign Up"
              className="w-full cursor-pointer"
            />
          </div>
        </div>

        <div className="text-center mt-4 text-sm text-slate-600">
          Already have an account?{" "}
          <a href="/signin" className="text-purple-600 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
