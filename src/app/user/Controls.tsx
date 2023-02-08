"use client";

import { UserContext } from "@/contexts/UserContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { logout } from "@/adapters/userAdapter";

export default function Controls({}) {
  const User = useContext(UserContext);
  const navigator = useRouter();

  const [isAccountCreationMode, setIsAccountCreationMode] = useState(false);
  const [adminMode, setAdminMode] = useState("Acc Creation");

  function goToMessages() {
    navigator.push("/user/messages/");
  }

  async function logoutUser() {
    const token = localStorage.getItem("token");

    if (!token) return;

    const status = await logout(token);

    if (status == 204) console.log("User was logged out");
    else if (status == 500) console.log("Backend error");

    location.reload();
  }

  function goBack() {
    navigator.back();
  }

  function returnHome() {
    navigator.push("/user/");
  }

  function switchAdminModes() {
    if (isAccountCreationMode) {
      // TODO: CREATE ROUTE FOR ADMIN ACCOUNT CREATION
      setAdminMode("Pin Change");
    } else {
      // TODO: CREATE ROUTE FOR ADMIN PIN CHANGE
      setAdminMode("Acc Creation");
    }

    setIsAccountCreationMode(!isAccountCreationMode);
  }

  return (
    <div className="flex phone:flex-row laptop:flex-col phone:w-96 laptop:w-32 rounded-lg phone:h-[150px] laptop:h-[600px] items-center justify-center p-3">
      {User?.isAdmin ? (
        <SettingsButton
          text={adminMode}
          imageSrc="/images/swap.png"
          operation={switchAdminModes}
        />
      ) : (
        <>
          <SettingsButton
            text="Home"
            imageSrc="/images/home.png"
            operation={returnHome}
          />

          <SettingsButton
            text="Messages"
            imageSrc="/images/message.png"
            operation={goToMessages}
          />
        </>
      )}

      <SettingsButton
        text="Logout"
        imageSrc="/images/settings.png"
        operation={logoutUser}
      />

      <SettingsButton
        text="Go Back"
        imageSrc="/images/turn-back.png"
        operation={goBack}
      />
    </div>
  );
}

function SettingsButton({
  text,
  imageSrc,
  operation,
}: {
  text: string;
  imageSrc: string;
  operation: () => void;
}) {
  return (
    <div
      className="self-start text-center phone:w-20 phone:h-28 laptop:w-24 laptop:h-32 mx-1 my-1 border-4 border-black items-center bg-u_gray p-3 rounded-lg"
      onClick={operation}
    >
      <Image src={imageSrc} alt="settings" width={80} height={80} />

      <span className="phone:text-xs laptop:text-[15px]">{text}</span>
    </div>
  );
}
