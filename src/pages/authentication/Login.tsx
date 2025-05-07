import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import headerImg from "@/assets/myajoImg.jpg"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt with:", { email, password });
  };

  return (
    <div className="flex min-h-screen rounded-0 md:rounded-lg md:min-h-full md:shadow-lg md:bg-white rounded-0 flex-col items-center text-start justify-center bg-[#f8f5f0] pb-4 w-full">
      {/* <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-sm"> */}
      <div className="mb-5 h-[50%]">
        <img src={headerImg} alt="" />
      </div>
      <div className="md:px-5 space-y-5">
        <div className="flex flex-col items-start space-y-1">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-900">
            Welcome back to MyAjo
          </h1>
          <p className=" text-gray-600">
            Log in to manage your group and contributions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full rounded-lg border-0 bg-[#f0d9b5] p-3 text-gray-900 placeholder-gray-500 focus:border-[#8B5A2B] focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                 placeholder="Enter your password"
                required
                className="w-full rounded-lg border-0 bg-[#f0d9b5] p-3 text-gray-900 placeholder-gray-500 focus:border-[#8B5A2B] focus:outline-none"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 w-full rounded-md bg-[#5D3A00] p-3 text-center font-medium text-white hover:bg-[#7a4f26] focus:outline-none"
          >
            Log in
          </button>
        </form>

        <div className="text-center text-sm">
          <a href="#" className="text-gray-600 hover:underline">
            Forgot password? <span className="text-[#8B5A2B]">Reset</span>
          </a>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
