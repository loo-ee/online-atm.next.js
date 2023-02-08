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
    <div className="flex flex-col w-full p-5">
      <span className="text-4xl self-center">{headerText}</span>

      <div className="flex flex-row h-[200px] items-center">
        <Image
          src={profileSrc}
          alt="profile pic"
          width={150}
          height={150}
          className="rounded-full"
        />

        <div className="flex flex-col ml-5">
          <span className="text-5xl">{User?.username}</span>
          <span className="text-2xl mt-3">{User?.email}</span>{" "}
        </div>
      </div>

      <div className="mt-5 w-[300px] justify-around flex flex-row items-center">
        <label
          htmlFor="imgInput"
          className="w-[160px] h-[50px] p-3 text-white text-center mt-5 border-2 bg-primary border-black rounded"
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
