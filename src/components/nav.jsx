import React from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <a href="/" className="flex items-center">
                            <span className="ml-2 text-2xl font-bold text-teal-600">MW-Mart</span>
                        </a>
                    </div>

                    <div className="hidden md:flex flex-1 justify-center px-8">
                        <div className="w-full max-w-lg">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="search"
                                    name="search"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    placeholder="Search for products..."
                                    type="search"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate('/cart')}>
                            <ShoppingCart className="h-6 w-6 text-gray-600" />
                        </Button>
                        <Button variant="ghost" size="icon" >
                            <User className="h-6 w-6 text-gray-600" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Nav;
