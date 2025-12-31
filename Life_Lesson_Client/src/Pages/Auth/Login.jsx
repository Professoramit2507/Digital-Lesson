import React from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";


const Login = () => {
   const { register,handleSubmit } = useForm();
  const {signInUser,googleSignIn} = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  console.log(location)


    const handleLogin = (data) => {
    console.log(data)
    signInUser(data.email,data.password)
    .then(res => {
        console.log(res)
        navigate(location.state||'/')
    })
    .catch(error => {
        console.log(error)
    })

  }

  const handleGoogleSignIn = () => {
    googleSignIn()
    .then(res => {
        console.log(res)
         navigate(location.state||'/')
    })
    .catch(error => {
        console.log(error)
    })
  }
  return (
    <div className="bg-gradient-to-br from-[#00ff75] to-[#3700ff] p-[2px] rounded-[22px] transition-all duration-300 w-96 mx-auto mt-6">

      <div className="bg-[#171717] rounded-[20px] p-8 transition-all duration-200 hover:scale-[0.98]">

        <form 
          onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-3">

          <p className="text-center text-[#00ffc8] text-3xl font-bold mb-6">
            Login
          </p>

          {/* Email */}
          <div className="flex items-center gap-2 bg-[#171717] text-white p-3 rounded-2xl shadow-inner shadow-black">
            <input
              className="bg-transparent outline-none w-full text-[#00ffc8]"
              type="email"
                {...register("email", { required: true })}
              placeholder="Email Address"
             // onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-2 bg-[#171717] text-white p-3 rounded-2xl shadow-inner shadow-black">
            <input
              className="bg-transparent outline-none w-full text-[#00ffc8]"
              type="password"
               {...register("password", { required: true })}
              placeholder="Password"
              //onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-6 px-4 w-full py-2 rounded-md bg-gradient-to-br from-[#00ff75] to-[#3700ff] text-black transition hover:from-[#00642f] hover:to-[#13034b] hover:text-[#00ffc8]"
          >
            Login
          </button>

          {/* Sign Up */}
          <div className="text-center mt-4">
            <p className="text-white">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="underline text-xl text-blue-500 cursor-pointer"
              >
                Sign Up
              </Link>
            </p>
          </div>

          <span className="text-white text-center mt-2">Or with</span>

          {/* Google Button */}
          <button
          onClick={handleGoogleSignIn}
            type="button"
            className="w-full mt-3 flex cursor-pointer items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded-lg border border-gray-300 hover:bg-green-200 transition"
          >
            <svg
              aria-label="Google logo"
              width="18"
              height="18"
              viewBox="0 0 512 512"
            >
              <g>
                <path fill="#fff" d="m0 0H512V512H0" />
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
              </g>
            </svg>
            Login with Google
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;

