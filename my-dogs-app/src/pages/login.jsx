import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (username && password) {
      navigate('/doggoHome')
    }
  }

  return (
    <div className="flex w-full h-screen dark:bg-gray-700">
      <div className='w-full flex items-center justify-center'>
        <form onSubmit={handleFormSubmit} className='bg-sky-50 rounded-md'>
          <div className='px-10 py-20'>
          <h1 className="text-3xl font-bold pb-5">Hello Fellow Fur Parent!! 👋</h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
              <input 
                id="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                placeholder="Username"
                type="text" 
                name="username"
                value={username} 
                onChange={event => setUsername(event.target.value)} 
              />
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input 
                id="password"
                type="password" 
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={password} 
                onChange={event => setPassword(event.target.value)} 
              />
            </div>      
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Log in</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default login