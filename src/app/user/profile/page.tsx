"use client";

import { UserContext } from "@/contexts/UserContext";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

export default function ProfilePage() {
  const User = useContext(UserContext);

  const imageInput = useRef<HTMLInputElement>(null);

  const [profileSrc, setProfileSrc] = useState("/images/account.png");

  setTimeout(() => {
    imageInput.current?.addEventListener("change", function () {
      const fileReader = new FileReader();

      fileReader.addEventListener("load", function () {
        const result = fileReader.result;
        if (typeof result == "string") {
          setProfileSrc(result);
          User!.setAvatar(result);
        }
      });

      if (this.files) fileReader.readAsDataURL(this.files[0]);
    });
  }, 1000);

  useEffect(() => {
    if (User?.avatar) setProfileSrc(User.avatar);
  }, [User?.avatar]);

  return (
    <div className="w-full p-5">
      <div className="flex flex-row items-center">
        <Image
          src={profileSrc}
          alt="profile pic"
          width={150}
          height={150}
          className="rounded-full"
        />

        <div className="flex flex-col ml-5">
          <span className="text-5xl">{User?.username}</span>
          <span className="text-2xl mt-3">{User?.email}</span>
        </div>
      </div>

      <div className="mt-5">
        <input
          ref={imageInput}
          type="file"
          accept="image/jpeg, image/png, image/jpg"
        />
      </div>
    </div>
  );
}
