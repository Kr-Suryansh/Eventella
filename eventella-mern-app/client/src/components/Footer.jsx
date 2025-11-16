// Site-wide footer with brand, link placeholders, and social icons
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaCalendarAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white mt-20">
      {/* Main Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaCalendarAlt className="text-primary text-2xl" />
                <span className="font-cursive text-2xl font-bold brand-gradient-text leading-none tracking-wide">
                  Eventella
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Book your next unforgettable experience with us
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Browse Events', 'My Bookings', 'Contact Us'].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2">
                {['About Us', 'Privacy Policy', 'Terms & Conditions', 'Contact'].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-3">Get updates on new events</p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 pt-8">
            {/* Social Links */}
            <div className="flex justify-center gap-6 mb-6">
              {[
                { Icon: FaFacebook, label: 'Facebook' },
                { Icon: FaInstagram, label: 'Instagram' },
                { Icon: FaTwitter, label: 'Twitter' },
                { Icon: FaLinkedin, label: 'LinkedIn' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-primary transition-all duration-300 transform hover:scale-110"
                >
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                &copy; {currentYear} Eventella. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Made with <span className="text-primary">❤</span> for event lovers everywhere
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;