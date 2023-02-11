"use client";

import { getBanks } from "@/adapters/systemAdapter";
import { nullBank } from "@/util/globalVars";
import { BankModel } from "@/util/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AccountCreationPage({}) {
  const [bankSelected, setBankSelected] = useState(nullBank);
  const [banks, setBanks] = useState([nullBank]);
  const [isDropDownClicked, setDropDownClickStatus] = useState(true);

  const usernameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const dropdownContent = useRef<HTMLDivElement>(null);
  const btnChoices = useRef<HTMLButtonElement[]>([]);
  const dropDownBtn = useRef<HTMLButtonElement>(null);

  const navigator = useRouter();

  function makeAccountCreationRequest() {}

  function cancelAccountCreation() {
    navigator.back();
  }

  function chooseBank(pressedBank: BankModel) {
    setBankSelected(pressedBank);
  }

  async function fetchBanks() {
    const banks: BankModel[] | null = await getBanks();

    if (banks) {
      setBanks(banks);
      setBankSelected(banks[0]);
    }
  }

  function toggleDropDown() {
    setDropDownClickStatus((status) => (status = !status));

    if (isDropDownClicked) {
      handleDropdownMouseOver();
      handleDropdownBtnMouseOver();
    } else {
      handleDropdownMouseLeave();
      handleDropdownBtnMouseLeave();
    }
  }

  function handleDropdownMouseOver() {
    dropdownContent.current?.classList.add("block");
    dropdownContent.current?.classList.remove("hidden");
  }

  function handleDropdownMouseLeave() {
    dropdownContent.current?.classList.add("hidden");
    dropdownContent.current?.classList.remove("block");
  }

  function handleChoiceMouseOver(index: number) {
    btnChoices.current[index]!.style.backgroundColor = "#f1f1f1";
  }

  function handleChoiceMouseLeave(index: number) {
    btnChoices.current[index]!.style.backgroundColor = "white";
  }

  function handleDropdownBtnMouseOver() {
    dropDownBtn.current!.style.backgroundColor = "#3e8e41";
  }

  function handleDropdownBtnMouseLeave() {
    dropDownBtn.current!.style.backgroundColor = "#457b9d";
  }

  useEffect(() => {
    fetchBanks();
  }, []);

  return (
    <div className="phone:p-2 laptop:p-4 flex flex-col items-center justify-center laptop:h-[550px]">
      <div
        onMouseOver={handleDropdownMouseOver}
        onMouseLeave={handleDropdownMouseLeave}
        onClick={toggleDropDown}
        className="dropdown mb-10 self-center inline-block z-10"
      >
        <button
          ref={dropDownBtn}
          onMouseOver={handleDropdownBtnMouseOver}
          onMouseLeave={handleDropdownBtnMouseLeave}
          className="dropbtn w-[200px] bg-primary p-3 rounded hover:rounded-b-none text-white"
        >
          Select Bank
        </button>

        <div
          className="dropdown-content hidden absolute w-[200px] rounded-b-lg bg-white"
          ref={dropdownContent}
        >
          {banks.map((bank, index) => (
            <button
              key={bank.id}
              ref={(btn) => {
                if (btn) btnChoices.current[index] = btn;
              }}
              onMouseOver={() => handleChoiceMouseOver(index)}
              onMouseLeave={() => handleChoiceMouseLeave(index)}
              onClick={() => chooseBank(bank)}
              className="text-black p-2 block w-full"
            >
              {bank.bankName}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center flex flex-row items-center justify-center phone:w-[150px] laptop:w-[400px]">
        <span className="phone:text-xl laptop:text-3xl">Account Creation</span>
        <div className="ml-5 laptop:w-[100px] laptop:h-[100px] phone:w-[80px] phone:h-[50px] relative">
          <Image
            src={bankSelected.thumbnail}
            alt="bank thumb"
            fill
            className="rounded"
          />
        </div>
      </div>

      <div className="phone:text-sm laptop:text-xl phone:mt-3 laptop:mt-5">
        <div className="flex flex-row items-center phone:my-1 laptop:my-3 justify-between">
          <label htmlFor="username">Username: </label>
          <input
            ref={usernameInput}
            id="username"
            type="text"
            placeholder="Ex. jann"
            className="text-black phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg laptop:w-auto"
          />
        </div>

        <div className="flex flex-row items-center phone:my-2 laptop:my-3 justify-between">
          <label htmlFor="email">Email: </label>
          <input
            ref={emailInput}
            id="email"
            type="text"
            placeholder="Ex. jann@gmail.com"
            className="text-black phone:p-1 laptop:p-3 rounded phone:w-32 phone:text-xs laptop:text-lg laptop:w-auto"
          />
        </div>
      </div>

      <div className="flex flex-row justify-between mt-3">
        <button
          onClick={makeAccountCreationRequest}
          className="bg-green-500 border-2 mx-5 border-black laptop:w-[140px] rounded-lg phone:p-2 laptop:p-4 laptop:mt-5 self-center"
        >
          <span className="laptop:text-xl text-white">Submit</span>
        </button>

        <button
          onClick={cancelAccountCreation}
          className="bg-red-500 border-2 mx-5 border-black laptop:w-[140px] rounded-lg phone:p-2 laptop:p-4 laptop:mt-5 self-center"
        >
          <span className="laptop:text-xl text-white">Cancel</span>
        </button>
      </div>
    </div>
  );
}
