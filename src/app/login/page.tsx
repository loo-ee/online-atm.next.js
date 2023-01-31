'use client';

import { UserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { useContext, useRef } from 'react';

export default function Login({}) {
  const User = useContext(UserContext);

  const navigator = useRouter();

  const emailField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);
  const loginBtn = useRef<HTMLButtonElement>(null);

  function login() {
    // TODO: CREATE LOGIN API CALL
  }

  return (
    <div className="flex flex-col mt-36 self-center items-center border-2 rounded-lg w-[500px] p-4">
      <div>Login</div>

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
            onClick={login}
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
