'use client';

import { getUser, login, validateSession } from '@/adapters/userAdapter';
import { UserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';

export default function Login({}) {
  const User = useContext(UserContext);
  const navigator = useRouter();

  const emailField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);
  const loginBtn = useRef<HTMLButtonElement>(null);

  const [headerText, setHeaderText] = useState('Please Enter Details');

  setTimeout(() => {
    loginBtn.current?.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = emailField.current?.value;
      const password = passwordField.current?.value;

      if (email == undefined || password == undefined) {
        setHeaderText('Please fill all fields');
        return;
      }

      const token = await login(email, password);
      console.log(token);
      const foundUser = await getUser(email, password);

      if (foundUser) User?.setUser(foundUser);
      localStorage.setItem('token', token.token);

      setHeaderText('Login Sucess! Redirecting...');

      setTimeout(() => {
        if (foundUser?.isAdmin) navigator.push('/admin/');
        else navigator.push('/user/');
      }, 3000);
    });
  });

  useEffect(() => {
    const fetchAuthenticatedUser = async (token: string) => {
      if (token == '') return;

      try {
        const user = await validateSession(token);
        console.log(user.detail);

        if (user.detail != 'Invalid token.') {
          User!.setUser(user);

          if (user.isAdmin) navigator.push('/admin/');
          else navigator.push('/user/');
        } else {
          setHeaderText('Session Expired.');
        }
      } catch (error) {
        setHeaderText('Session Expired');
      }
    };

    const token = localStorage.getItem('token');
    console.log(token);

    if (!token) navigator.push('/login/');
    else {
      // setToken(token);
      fetchAuthenticatedUser(token);
    }
  }, []);

  return (
    <div className="flex flex-col mt-36 self-center items-center border-2 rounded-lg w-[500px] p-4">
      <div>{headerText}</div>

      <div>
        <form action="" className="flex flex-col items-center">
          <input
            ref={emailField}
            type="text"
            id="email"
            placeholder="Enter email"
            className="border-2 border-black rounded p-2 my-3"
          />

          <input
            ref={passwordField}
            type="password"
            id="password"
            placeholder="Enter password"
            className="border-2 border-black rounded p-2 my-3"
          />

          <button
            ref={loginBtn}
            className="border-2 border-black rounded-lg p-2 w-32 mt-2"
          >
            Login
          </button>
        </form>
      </div>

      <div className="flex flex-col p-3 mt-4 items-center">
        <span>Haven&#39;t registered yet?</span>
        <button
          onClick={() => {
            navigator.push('/register/');
          }}
          className="border-2 border-black rounded-lg p-2 w-32 mt-4"
        >
          Register
        </button>
      </div>
    </div>
  );
}
