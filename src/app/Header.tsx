import Image from 'next/image';
import Link from 'next/link';

export default function Header({}) {
  return (
    <div
      id="header"
      className="flex flex-row justify-between border-b-4 border-black items-center pb-3 w-full fixed bg-secondary z-50"
    >
      <div className="flex flex-row w-full items-center">
        <Link href="/" className="flex flex-row ml-3 mt-3">
          <Image
            src="/images/money-transfer.png"
            alt="money transfer image"
            width={60}
            height={60}
          />

          <span className="text-u_darkblue ml-5 laptop:text-5xl tablet:text-2xl phone:text-md">
            ATM Service
          </span>
        </Link>
      </div>
      <div className="flex flex-row justify-between phone:w-20 laptop:w-72 mx-7">
        <Image
          src="/images/protect.png"
          alt="money protection"
          width={60}
          height={60}
          className="laptop:flex phone:hidden"
        />

        <Image
          src="/images/account.png"
          alt="money protection"
          width={60}
          height={60}
          className="rounded-full ml-2 mt-3 phone:mx-12"
        />
      </div>
    </div>
  );
}
