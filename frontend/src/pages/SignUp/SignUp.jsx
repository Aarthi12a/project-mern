import React from "react";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link } from "react-router-dom";
import validEmail from "../../utils/helper";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!validEmail(email)) {
      setError("Invalid Email");
      return;
    }

    setError("");
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Create Account</h4>
            <input
              type="text"
              placeholder="First Name"
              className="input-box"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input-box"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <PasswordInput
              password={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              SignUp
            </button>

            <p>
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
