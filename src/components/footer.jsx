import React from 'react';
// import { Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center">
              <span className="ml-2 text-2xl font-bold text-teal-500">MW-Mart</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Your one-stop shop for the best products. We provide high-quality items and excellent customer service.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contacts</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">About</a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">Store</a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">FAQ</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Social</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">Facebook</a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">Twitter</a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">&copy; 2024 MW-Mart. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-github fa-lg"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
