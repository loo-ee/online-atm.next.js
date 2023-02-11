"use client";

import { updateUser } from "@/adapters/userAdapter";
import { UserContext } from "@/contexts/UserContext";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

export default function ProfilePage() {
  const User = useContext(UserContext);

  const imageInput = useRef<HTMLInputElement>(null);

  const [headerText, setHeaderText] = useState("Profile");
  const [profileSrc, setProfileSrc] = useState("/images/account.png");
  const [btnStatus, setBtnStatus] = useState(true);

  setTimeout(() => {
    imageInput.current?.addEventListener("change", function () {
      const fileReader = new FileReader();

      fileReader.addEventListener("load", function () {
        const result = fileReader.result;
        if (typeof result == "string") {
          setProfileSrc(result);
        }
      });

      if (this.files) {
        fileReader.readAsDataURL(this.files[0]);
        setBtnStatus(false);
      }
    });
  }, 1000);

  async function updateUserAvatar() {
    User!.setAvatar(profileSrc);

    setTimeout(async () => {
      const foundUser = User!.getUser();
      const newUser = { ...foundUser, avatar: profileSrc };
      const status = await updateUser(newUser);

      if (status == 400) changeHeader("Profile Picture Changed!");
      else if (status == 500) changeHeader("Something went wrong...");
    }, 1000);
  }

  function changeHeader(text: string) {
    setHeaderText(text);

    setTimeout(() => {
      setHeaderText("PROFILE");
    }, 3000);
  }

  useEffect(() => {
    setProfileSrc(User!.avatar);
  }, [User!.avatar]);

  return (
    <div className="flex flex-col w-full h-full laptop:p-5 phone:p-2 items-center">
      <span className="laptop:text-4xl phone:text-3xl self-center">
        {headerText}
      </span>

      <div className="flex flex-row h-[200px] items-center mt-5">
        <div className="relative laptop:w-[200px] laptop:h-full phone:w-[100px] phone:h-[100px]">
          <Image
            src={profileSrc}
            alt="profile pic"
            fill
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col ml-5">
          <span className="laptop:text-5xl phone:text-3xl">
            {User?.username}
          </span>
          <span className="laptop:text-2xl phone:text-lg mt-3">
            {User?.email}
          </span>{" "}
        </div>
      </div>

      <div className="laptop:mt-5 phone:mt-2 laptop:w-[300px] phone:w-[250px] justify-around flex flex-row items-center">
        <label
          htmlFor="imgInput"
          className="laptop:w-[160px] phone:w-[100px] h-[50px] laptop:p-3 phone:p-2 text-white laptop:text-md phone:text-sm text-center mt-5 border-2 bg-primary border-black rounded"
        >
          Select new Profile
          <input
            id="imgInput"
            ref={imageInput}
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            className="hidden w-full"
          />
        </label>

        <button
          onClick={updateUserAvatar}
          disabled={btnStatus}
          className="w-[100px] h-[50px] mt-5 border-2 border-black p-3 rounded bg-primary text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
}
