"use client";
import React from "react";
import { SearchBar } from "./Searchbar";
import Link from "next/link";

const Navbar = () => {

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
        {/* Logo Section */}
        <div className="text-white text-2xl font-bold">
          <Link href="/">Pokemon Search App</Link>
        </div>

        {/* Search Bar Section */}
        <div className="w-1/3">
          <SearchBar />
        </div>

        {/* Navigation Section */}
        <div className="text-white text-xl hover:text-yellow-500">
          <Link href="/">Home</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
