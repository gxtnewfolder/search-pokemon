"use client";
import React from "react";
import { SearchBar } from "@/components/Searchbar"; // Import your existing SearchBar component
import Link from "next/link";

const Navbar = () => {

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="text-white text-2xl font-bold">
          <Link href="/">Pokemon Search App</Link>
        </div>

        {/* Search Bar Section */}
        <SearchBar />

        {/* Navigation Section */}
        <div className="text-white text-xl hover:text-yellow-500">
          <Link href="/">Home</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
