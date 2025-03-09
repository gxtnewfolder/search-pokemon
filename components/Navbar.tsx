"use client";
import React from "react";
import { SearchBar } from "./Searchbar";
import Link from "next/link";
import Image from "next/image";
import pokeball from "@/public/Logo.jpg";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 h-16">
        {/* Logo Section */}
        <Link 
          href="/" 
          className="flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-blue-500 transition-colors"
        >
          <Image
            src={pokeball}
            alt="Pokemon Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span>PokéSearch</span>
        </Link>

        {/* Search Bar Section */}
        <div className="w-1/2 max-w-2xl px-4">
          <SearchBar />
        </div>

        {/* Navigation Section */}
        <div className="flex items-center space-x-6">
          <Link 
            href="/" 
            className="text-gray-600 hover:text-blue-500 font-medium transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className="text-gray-600 hover:text-blue-500 font-medium transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
