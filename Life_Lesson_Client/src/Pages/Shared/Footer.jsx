import React from "react";
import img from '../../assets/imgaes/logo.jpg'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo + Website Name */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src={img}
              alt="Logo"
              className="w-12 h-12 object-cover"
            />
            <h2 className="text-2xl font-bold text-white">LifeLearn</h2>
          </div>
          <p className="text-gray-400">
            Learning from real life experiences that create lasting impact.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
          <ul className="space-y-2">
            <li>
              Email:{" "}
              <span className="text-gray-400">support@lifelearn.com</span>
            </li>
            <li>
              Phone: <span className="text-gray-400">+1 234 567 890</span>
            </li>
            <li>
              Address: <span className="text-gray-400">New York, USA</span>
            </li>
          </ul>
        </div>

        {/* Terms & Social Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">
            Useful Links
          </h3>
          <ul className="space-y-2 mb-4">
            <li className="hover:text-white transition cursor-pointer">
              Terms & Conditions
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-white transition cursor-pointer">FAQ</li>
          </ul>

          <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-white transition">
              🌐
            </a>
            <a href="#" className="hover:text-white transition">
              📘
            </a>
            <a href="#" className="hover:text-white transition">
              📸
            </a>
            <a href="#" className="hover:text-white transition">
              🐦
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-500 mt-10 pt-6 border-t border-gray-700">
        © {new Date().getFullYear()} LifeLearn — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
