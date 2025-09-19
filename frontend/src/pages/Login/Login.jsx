import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { useState } from 'react'
import axiosInstance from '../../utils/axiosinstance'

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Invalid Email');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    setError('');

    try {
      const response = await axiosInstance.post('/login', { email, password });

      if (response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex h-screen">
        {/* Left Side Image */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-100">
          <img
            src="https://www.creativefabrica.com/wp-content/uploads/2022/04/05/green-digital-paper-note-vector-Graphics-28450428-1.png"
            alt="Login Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Side Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
          <div className="w-96 border rounded-lg shadow-lg px-7 py-10">
            <form onSubmit={handleLogin}>
              <h4 className="text-2xl mb-7 font-bold text-center">Login</h4>

              <input
                type="email"
                placeholder="Email"
                className="input-box mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <PasswordInput
                password={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="text-red-500 text-xs pb-2">{error}</p>}


<button 
  type="submit" 
  className="btn-primary w-full mt-4 hover:bg-green-400 transition-colors duration-200"
>
  Login
</button>



              <p className="mt-4 text-center text-sm">
                Not Registered Yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary underline"
                >
                  Create an Account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
