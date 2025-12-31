import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser,googleSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = (data) => {
    console.log(data);
    registerUser(data.email, data.password)
      .then(() => {
        navigate(location.state || '/');
      })
      .catch(error => {
        console.error(error);
      });
  };

   const handleGoogleRegister = () => {
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
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] px-4 py-10">
      <div className="bg-gradient-to-br from-[#00ff75] to-[#3700ff] p-[3px] rounded-3xl shadow-xl w-full max-w-md">
        <div className="bg-[#121212] rounded-3xl p-8">

          {/* Heading */}
          <h2 className="text-3xl font-bold text-center text-[#00ffc8] mb-7 tracking-wide">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-4">

            {/* Name */}
            <div className="flex items-center gap-3 bg-[#1a1a1a] p-3 rounded-2xl">
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Full Name"
                className="bg-transparent w-full outline-none text-[#00ffc8]"
              />
            </div>
            {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}

            {/* Email */}
            <div className="flex items-center gap-3 bg-[#1a1a1a] p-3 rounded-2xl">
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email Address"
                className="bg-transparent w-full outline-none text-[#00ffc8]"
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}

            {/* Photo */}
            <div className="flex items-center gap-3 bg-[#1a1a1a] p-3 rounded-2xl">
              <input
                type="text"
                {...register("photo", { required: "Photo URL is required" })}
                placeholder="Photo URL"
                className="bg-transparent w-full outline-none text-[#00ffc8]"
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 bg-[#1a1a1a] p-3 rounded-2xl">
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" }
                })}
                placeholder="Password"
                className="bg-transparent w-full outline-none text-[#00ffc8]"
              />
            </div>
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}

            {/* Submit */}
            <button className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-[#00ff75] to-[#3700ff] font-semibold text-black hover:opacity-90 transition">
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-5 text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 underline hover:text-blue-300">
              Login
            </Link>
          </p>

          {/* Divider */}
          <div className="my-4 flex items-center gap-2">
            <div className="h-[1px] flex-1 bg-gray-600" />
            <span className="text-gray-300">OR</span>
            <div className="h-[1px] flex-1 bg-gray-600" />
          </div>

          {/* Google Login (placeholder) */}
          <button
          onClick={handleGoogleRegister}
            type="button"
            className="w-full cursor-pointer flex items-center justify-center gap-3 bg-white text-black px-4 py-3 rounded-xl hover:bg-gray-100 transition"
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
            Continue with Google
          </button>

        </div>
      </div>
    </div>
  );
};

export default Register;
