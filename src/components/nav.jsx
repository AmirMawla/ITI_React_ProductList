import React from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../store/useThemeStore';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { use } from 'react';


const Nav = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const toggleTheme = useTheme((state) => state.toggleTheme);
    const cartItems = useSelector(state => state.cart.cartItems);
    const { language, toggleLanguage } = use(LanguageContext);

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className={`shadow-sm sticky top-0 z-50 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <span className="ml-2 text-2xl font-bold text-teal-500">MW-Mart</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex flex-1 justify-center px-8">
                        <div className="w-full max-w-lg">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Search className={`h-5 w-5 ${theme === 'light' ? 'text-gray-400' : 'text-gray-300'}`} />
                                </div>
                                <input
                                    id="search"
                                    name="search"
                                    className={`block w-full pl-10 pr-3 py-2 border rounded-full leading-5 sm:text-sm ${theme === 'light' ? 'bg-gray-50 border-gray-300 placeholder-gray-500 focus:ring-teal-500 focus:border-teal-500' : 'bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 text-white'}`}
                                    placeholder="Search for products..."
                                    type="search"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" onClick={toggleLanguage}>
                            {language === 'en' ? 'AR' : 'EN'}
                        </Button>
                        <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/cart')}>
                            <ShoppingCart className={`h-6 w-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`} />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </Button>
                        <Button variant="ghost" size="icon" >
                            <User className={`h-6 w-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={toggleTheme}>
                            {theme === 'light' ? '🌞' : '🌜'}
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Nav;
