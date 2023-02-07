'use client';

import { createUser, searchUserEmail } from '@/adapters/userAdapter';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function Register({}) {
  const navigator = useRouter();

  const usernameRegister = useRef<HTMLInputElement>(null);
  const emailRegister = useRef<HTMLInputElement>(null);
  const pass1Register = useRef<HTMLInputElement>(null);
  const pass2Register = useRef<HTMLInputElement>(null);
  const registerBtn = useRef<HTMLButtonElement>(null);

  const [headerText, setHeaderText] = useState('Register a user');

  setTimeout(() => {
    registerBtn.current?.addEventListener('click', async (e) => {
      e.preventDefault();

      const username = usernameRegister.current?.value;
      const email = emailRegister.current?.value;
      const pass1 = pass1Register.current?.value;
      const pass2 = pass2Register.current?.value;

      if (
        username == undefined ||
        email == undefined ||
        pass1 == undefined ||
        pass2 == undefined
      ) {
        changeHeader('Please fill all fields');
        return;
      }

      if ((await searchUserEmail(email)) != 404) {
        changeHeader('This email is already used!');
        emailRegister.current!.value = '';
        return;
      }

      if (pass1 != pass2) {
        changeHeader('Passwords do not match!');
        return;
      }

      const status = await createUser({
        username: username,
        email: email,
        password: pass1,
      });

      usernameRegister.current!.value = '';
      emailRegister.current!.value = '';
      pass1Register.current!.value = '';
      pass2Register.current!.value = '';

      if (status) changeHeader('Account Created Successfully');
      else changeHeader('Something Went Wrong. Please Try Again');
    });

    function changeHeader(text: string) {
      setHeaderText(text);

      setTimeout(() => {
        setHeaderText('Register a user');
      }, 3000);
    }
  });

  return (
    <div className="flex flex-col mt-36 self-center items-center border-2 rounded-lg w-[500px] p-4">
      <div>{headerText}</div>

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
            ref={registerBtn}
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
