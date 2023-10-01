"use client";

import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import useBoardStore from "@/store/BoardStore";

function Header() {
  const [searchString, setSearchString] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
  ]);

  return (
    <header className="overscroll-none overflow-hidden">
      <div className=" flex flex-col md:flex-row items-center p-5 rounded-b-2xl mb-5">
        <div
          className="absolute top-0 left-0 w-full h-96
            rounded-md opacity-70 -z-50"
        />
        <Image
          priority={true}
          src="https://iili.io/JdWExxs.png"
          alt="ToDo Logo"
          width={300}
          height={300}
          className="w-20 h-20 md:w-20 pb-1 md:pb-0 object-contain"
        />
        <p className="font-sans text-2xl mb-2 text-white font-bold md:ml-4 md:mb-0 md:text-5xl">
          DV To Do App
        </p>
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          {/*Search Box*/}
          <form className="flex items-center h-10 space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:h-14 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="flex-1 text-gray-800 outline-none p-2"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          {/*UserPic*/}
          <Avatar name="Vlad D" round size="50" color="#0055D1" />
        </div>
      </div>
    </header>
  );
}

export default Header;
