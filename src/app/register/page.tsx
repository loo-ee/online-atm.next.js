'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function Register({}) {
  const navigator = useRouter();

  const usernameRegister = useRef<HTMLInputElement>(null);
  const emailRegister = useRef<HTMLInputElement>(null);
  const pass1Register = useRef<HTMLInputElement>(null);
  const pass2Register = useRef<HTMLInputElement>(null);

  function register() {
    // TODO: CREATE REGISTER API CALL
  }

  return (
    <div className="flex flex-col mt-36 self-center items-center border-2 rounded-lg w-[500px] p-4">
      <div>Register</div>

      <div>
        <form action="" className="flex flex-col items-center">
          <input
            ref={usernameRegister}
            type="text"
            id="usernameRegister"
            placeholder="Enter username"
            className="border-2 border-black rounded p-2 my-3"
          />

          <input
            ref={emailRegister}
            type="text"
            id="emailRegister"
            placeholder="Enter email address"
            className="border-2 border-black rounded p-2 my-3"
          />

          <input
            ref={pass1Register}
            type="password"
            id="pass1Register"
            placeholder="Enter password"
            className="border-2 border-black rounded p-2 my-3"
          />

          <input
            ref={pass2Register}
            type="password"
            id="pass2Register"
            placeholder="Verify password"
            className="border-2 border-black rounded p-2 my-3"
          />

          <button
            onClick={register}
            className="border-2 border-black rounded-lg p-2 w-32 mt-4"
          >
            Register
          </button>
        </form>
      </div>

      <div className="flex flex-col p-3 mt-4 items-center">
        <span>Already have an account?</span>
        <button
          onClick={() => {
            navigator.replace('/login/');
          }}
          className="border-2 border-black rounded-lg p-2 w-32 mt-4"
        >
          Login
        </button>
      </div>
    </div>
  );
}
