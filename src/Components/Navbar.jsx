import React, { useState } from 'react'
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from '@clerk/clerk-react'

import { Menu, X, ChevronDown } from 'lucide-react'



export default function Navbar({ onSearch }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      scrollToSection('recipes')
      setIsOpen(false)
    }
  }

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-md px-6 py-1 shadow-lg text-white"
      style={{ backgroundColor: 'rgba(128, 128, 128, 0.279)' }}
    >
      <div className="flex items-center justify-between">
        {/* Logo + App Name */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => scrollToSection('home')}
        >
          <img
            src="/logo.jpeg"            alt="Yummy Recipes Logo"
            className="h-12 w-12 rounded-full border border-gray-300 shadow-sm"
          />
          <h1 className="text-white text-2xl font-bold">Yummy Recipes</h1>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-6 cursor-pointer">
          <div onClick={() => scrollToSection('home')} className="hover:text-gray-300 transition">
            Home
          </div>
          <div onClick={() => scrollToSection('recipes')} className="hover:text-gray-300 transition">
            Recipes
          </div>

          {/* Contact Dropdown */}
          <div className="relative group">
            <div
              className="flex items-center gap-1 hover:text-gray-300 transition cursor-pointer"
              onClick={() => {
                setShowDropdown(!showDropdown)
                scrollToSection('footer')
              }}
            >
              Contact <ChevronDown size={16} />
            </div>
            {showDropdown && (
              <div className="absolute mt-2 bg-white text-black rounded shadow-lg p-2 space-y-1 z-50 min-w-[160px]">
                <p className="hover:bg-gray-100 px-3 py-1 rounded">Samridhi Sapkota</p>
                <p className="hover:bg-gray-100 px-3 py-1 rounded">Nirmita Pandit</p>
                <p className="hover:bg-gray-100 px-3 py-1 rounded">Krisha Dheke</p>
                <p className="hover:bg-gray-100 px-3 py-1 rounded">Hikmat Malla</p>
                <p className="hover:bg-gray-100 px-3 py-1 rounded">Akash Bhatta</p>
              </div>
            )}
          </div>

          {/* Search bar */}
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => scrollToSection('recipes')}
              className="px-3 py-1 rounded-l-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              type="submit"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 rounded-r-md font-semibold"
            >
              Search
            </button>
          </form>

          {/* Auth Buttons */}
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode='modal'>
              <button className="bg-gray-700 hover:bg-gray-900 text-white px-3 py-1 rounded font-semibold">
                Log In
              </button>
            </SignInButton>
            <SignUpButton mode='modal'>
              <button className="bg-white hover:bg-gray-200 text-black px-3 py-1 rounded font-semibold">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-3 flex flex-col items-start text-white">
          <div onClick={() => scrollToSection('home')} className="hover:text-gray-300 transition">
            Home
          </div>
          <div onClick={() => scrollToSection('recipes')} className="hover:text-gray-300 transition">
            Recipes
          </div>

          {/* Contact Mobile */}
          <div className="w-full">
            <div
              className="flex items-center justify-between w-full hover:text-gray-300 transition cursor-pointer"
              onClick={() => {
                setShowDropdown(!showDropdown)
                scrollToSection('footer')
              }}
            >
              Contact <ChevronDown size={16} />
            </div>
            {showDropdown && (
              <div className="bg-white text-black mt-2 rounded shadow p-2 w-full space-y-1">
                <p className="hover:bg-gray-100 px-3 py-1 rounded">Raja Babu</p>
                <p className="hover:bg-gray-100 px-3 py-1 rounded">John Doe</p>
                <p className="hover:bg-gray-100 px-3 py-1 rounded">Priya Sharma</p>
              </div>
            )}
          </div>

          {/* Search Bar Mobile */}
          <form onSubmit={handleSubmit} className="flex w-full">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => scrollToSection('recipes')}
              className="flex-grow px-3 py-1 rounded-l-md bg-white text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gray-600 text-white px-4 rounded-r-md"
            >
              Search
            </button>
          </form>

          {/* Auth Buttons */}
          <div className="flex space-x-3 mt-2">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <button className="bg-gray-700 hover:bg-gray-900 text-white px-3 py-1 rounded font-semibold">
                  Log In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-white hover:bg-gray-200 text-black px-3 py-1 rounded font-semibold">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  )
}
