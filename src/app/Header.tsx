import Link from 'next/link';

export default function Header({}) {
  return (
    <div
      id="header"
      className="flex flex-row justify-between border-b-4 border-black items-center pb-3 w-full fixed bg-secondary z-50"
    >
      <div className="flex flex-row w-full items-center">
        {/* <img
          src={
            new URL('../../assets/images/money-transfer.png', import.meta.url)
              .href
          }
          className="w-16 ml-3 mt-3"
          onClick={returnToHomePage}
          alt=""
        /> */}
        <Link href="/">
          <span className="text-u_darkblue ml-5 laptop:text-5xl tablet:text-2xl phone:text-md">
            ATM Service
          </span>
        </Link>
      </div>
      <div className="flex flex-row justify-between phone:w-20 laptop:w-72 mx-7">
        {/* <img
          src={new URL('../../assets/images/protect.png', import.meta.url).href}
          className="w-16 laptop:flex phone:hidden"
          alt=""
        />
        <img
          src={new URL('../../assets/images/account.png', import.meta.url).href}
          className="phone:w-10 laptop:w-16 rounded-full ml-2 mt-3 phone:mx-12"
          alt=""
        /> */}
      </div>
    </div>
  );
}
