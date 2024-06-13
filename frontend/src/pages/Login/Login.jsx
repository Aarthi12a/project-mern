import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import validEmail from '../../utils/helper'
import { useState } from 'react'

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        
        if(!validEmail(email)) {
            setError('Invalid Email');
            return;
        }

        if(!password) {
            setError('Password is required');
            return;
        }

        setError('');
    }



  return (
    <>
        <Navbar />

        <div className='flex items-center justify-center mt-28'>
            <div className='w-96 border rounded bg-white px-7 py-10'>
                <form onSubmit={handleLogin}>
                    <h4 className='text-2xl mb-7'>
                        Login
                    </h4>
                    <input type='email' placeholder='Email' className='input-box' 
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                    />

                    <PasswordInput 
                        password={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />

                    {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                    <button type='submit' className='btn-primary'>Login</button>

                    <p>
                        Not Registered Yet? {" "} <Link to='/signup' className='font-medium text-primary underline'>Create an Account</Link>
                    </p>
                </form>
            </div>
        </div>
    </>
  )
}
