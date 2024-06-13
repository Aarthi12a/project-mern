import React from 'react'
import { getInitials } from '../../utils/helper'
import { useNavigate } from 'react-router-dom'

export default function ProfileInfo() {

    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/login');
    }


  return (
    <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
            {getInitials('Name Here')}
        </div>
        <div>
            <p className='text-sm font-medium'>
                Name Here
            </p>
            <button className='text-sm text-slate-700 underline' onClick={handleLogout}>
                Logout
            </button>
        </div>
    </div>
  )
}
