"use client";

import { useGetHeaderData } from "@/queries/useLayout";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const { data, isLoading, isError, error } = useGetHeaderData();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  if (isLoading) {
    return (
      <header className="bg-[#006980] py-3 md:py-4 px-4 md:px-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex gap-4 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-5 md:h-6 w-16 md:w-20 bg-teal-600 animate-pulse rounded"
              />
            ))}
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="h-5 md:h-6 w-12 md:w-16 bg-teal-600 animate-pulse rounded" />
            <div className="h-8 md:h-10 w-32 md:w-48 bg-teal-500 animate-pulse rounded-full" />
          </div>
        </nav>
      </header>
    );
  }

  if (isError || !data) {
    return (
      <header className="bg-[#006980] py-3 md:py-4 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-300 text-xs md:text-sm text-center">
            Failed to load header: {error?.message || "Unknown error"}
          </p>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-[#006980] py-3 md:py-4 px-4 md:px-6 relative">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-2 hover:bg-teal-600 rounded-md transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
          {data.navigation.map((item) => (
            <li key={item.id} className="relative">
              {item.type === "link" ? (
                <Link
                  href={item.href}
                  className={`text-white text-sm xl:text-base hover:text-teal-200 transition-colors ${
                    item.id === "home" ? "opacity-60" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.id ? null : item.id)
                    }
                    className="flex items-center gap-1 text-white text-sm xl:text-base hover:text-teal-200 transition-colors"
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {openDropdown === item.id && item.children && (
                    <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-48 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-[#006980] transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center gap-1.5 md:gap-2 text-white hover:text-teal-200 transition-colors text-sm md:text-base"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{data.language.current}</span>
              <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
            </button>

            {languageOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-32 z-50">
                {data.language.options.map((option) => (
                  <button
                    key={option.code}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-[#006980] transition-colors"
                    onClick={() => {
                      setLanguageOpen(false);
                      // Handle language change here
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA Button */}
          <Link
            href={data?.cta?.href || "/"}
            className="bg-teal-500 hover:bg-teal-400 text-white px-3 md:px-6 py-2 md:py-2.5 rounded-full transition-colors font-medium text-xs md:text-sm whitespace-nowrap"
          >
            <span className="hidden sm:inline">{data?.cta?.label}</span>
            <span className="sm:hidden">Appointment</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#006980] z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-teal-600">
          <h2 className="text-white font-semibold text-lg">Menu</h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white p-2 hover:bg-teal-600 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <ul className="py-4">
          {data.navigation.map((item) => (
            <li key={item.id} className="border-b border-teal-600">
              {item.type === "link" ? (
                <Link
                  href={item.href}
                  className={`block px-6 py-3 text-white hover:bg-teal-600 transition-colors ${
                    item.id === "home" ? "opacity-60" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.id ? null : item.id)
                    }
                    className="w-full flex items-center justify-between px-6 py-3 text-white hover:bg-teal-600 transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === item.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === item.id && item.children && (
                    <div className="bg-teal-800">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href}
                          className="block px-10 py-2.5 text-white text-sm hover:bg-[#006980] transition-colors"
                          onClick={() => {
                            setOpenDropdown(null);
                            setMobileMenuOpen(false);
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
