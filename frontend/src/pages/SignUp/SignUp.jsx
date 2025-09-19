import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!email) {
      setError("Invalid Email");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/create-user", {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    
      <div className="flex h-screen">
        {/* Left Side Image */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-white-100">
          <img
            src="https://www.creativefabrica.com/wp-content/uploads/2022/04/05/green-digital-paper-note-vector-Graphics-28450428-1.png"
            alt="Signup Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Side Signup Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
          <div className="w-96 border rounded-lg shadow-lg px-7 py-10">
            <form onSubmit={handleSignUp}>
              <h4 className="text-2xl mb-7 font-bold text-center">Create Account</h4>

              <input
                type="text"
                placeholder="First Name"
                className="input-box mb-3"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input-box mb-3"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="input-box mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <PasswordInput
                password={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="text-red-500 text-xs pb-2">{error}</p>}

              <button type="submit" className="btn-primary w-full mt-4 hover:bg-green-500 transition-colors duration-200">
                Sign Up
              </button>

              <p className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
