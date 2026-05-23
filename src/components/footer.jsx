import React from 'react';
// import { Github, Twitter, Instagram } from 'lucide-react';
import { useTheme } from '../store/useThemeStore';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center">
              <span className="ml-2 text-2xl font-bold text-teal-500">MW-Mart</span>
            </div>
            <p className={`mt-4 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Your one-stop shop for the best products. We provide high-quality items and excellent customer service.
            </p>
          </div>
          <div>
            <h3 className={`text-sm font-semibold ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} tracking-wider uppercase`}>Contacts</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className={`text-base ${theme === 'light' ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'}`}>About</a>
              </li>
              <li>
                <a href="#" className={`text-base ${theme === 'light' ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'}`}>Store</a>
              </li>
              <li>
                <a href="#" className={`text-base ${theme === 'light' ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'}`}>FAQ</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={`text-sm font-semibold ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} tracking-wider uppercase`}>Social</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className={`text-base ${theme === 'light' ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'}`}>Facebook</a>
              </li>
              <li>
                <a href="#" className={`text-base ${theme === 'light' ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'}`}>Twitter</a>
              </li>
              <li>
                <a href="#" className={`text-base ${theme === 'light' ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'}`}>Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={`mt-8 border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} pt-8 flex flex-col sm:flex-row justify-between items-center`}>
          <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>&copy; 2024 MW-Mart. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className={`${theme === 'light' ? 'text-gray-400 hover:text-black' : 'text-gray-400 hover:text-white'}`}>
              <i className="fab fa-github fa-lg"></i>
            </a>
            <a href="#" className={`${theme === 'light' ? 'text-gray-400 hover:text-black' : 'text-gray-400 hover:text-white'}`}>
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#" className={`${theme === 'light' ? 'text-gray-400 hover:text-black' : 'text-gray-400 hover:text-white'}`}>
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
