import React from "react";
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SlSocialInstagram } from "react-icons/sl";
import Logo2 from "../../assets/logo2.png";

export default function FooterContents() {
  return (
    <footer className="relative bg-gray-950 text-white pt-20 pb-8 mt-20 overflow-hidden">
      {/* Glow Background Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-600/10 via-purple-600/10 to-pink-600/10 blur-3xl opacity-40"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center lg:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center mb-4">
              <img src={Logo2} alt="Logo" className="w-10" />
              <h2 className="ml-2 text-2xl font-bold tracking-wider">DOCKET</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              A modern platform empowering students through innovation,
              collaboration, and smart digital experiences.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">
              Product
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Features
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">
              Company
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-lg font-semibold mb-4 text-pink-400">
              Contact
            </h3>

            <p className="text-gray-400 text-sm mb-4 flex items-center gap-2 justify-center lg:justify-start">
              <MdEmail size={18} />
              docket@gmail.com
            </p>

            <div className="flex gap-4 text-xl">
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition transform hover:scale-110"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-pink-600 transition transform hover:scale-110"
              >
                <SlSocialInstagram />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-blue-500 transition transform hover:scale-110"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} DOCKET. All rights reserved.{" "}
        </div>
      </div>
    </footer>
  );
}
