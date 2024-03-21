import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import imgbg from '../assets/loginbg.png';

const Login = ({ loggedIn, onLogin, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass username and password to the parent component for authentication
    onLogin(username, password);
  };

  
  if (loggedIn) {
    return <Navigate replace to="/post" />;
  }

  return (
    <div className='flex flex-col justify-center items-center min-w-fit lg:h-full min-h-full'>
      <div className="-z-10 ">
      <img src={imgbg} alt="SWE20"/>
      </div>
      <div className="max-w-md w-fit mt-40 h-80 space-y-8 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg overflow-auto absolute top-10">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Welcome</h2>
          <h2 className="mt-1 text-center text-2xl font-bold text-gray-900">Not Gonna Lie to SWE-20</h2>
        </div>
        <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <path
                    fillRule="evenodd"
                    d="M2 5a3 3 0 013-3h10a3 3 0 013 3v9a3 3 0 01-3 3H5a3 3 0 01-3-3V5zm5 7V8a1 1 0 012 0v4a1 1 0 01-2 0z"
                    clipRule="evenodd"
                  />
              </span>
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default Login;
