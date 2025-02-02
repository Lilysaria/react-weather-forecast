/** @format */

import React from 'react';
import { IoMdSunny } from 'react-icons/io';
import { MdOutlineMyLocation } from 'react-icons/md';
import { ImLocation2 } from 'react-icons/im';
import SearchBox from './SearchBox';

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7x1 px-3 mx-auto">
        <p className="flex items-center justify-center gap-2 ">
          <h2 className="text-gray-500 text-3x1">weather</h2>
          <IoMdSunny className="text-3x1 mt-1 text-yellow-300" />
        </p>
        <section className="felx gap-2 items-center">
          <MdOutlineMyLocation className="text-2x1 text-gray-400 hover:opacity-80 cursor-pointer" />
          <ImLocation2 className="text-3x1" />
          <p className="text-slate-900/80 text-sm">India</p>
          <div>
            <SearchBox />
          </div>
        </section>
      </div>
    </nav>
  );
}
