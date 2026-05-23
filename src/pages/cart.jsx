import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../store/cartSlice';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useTheme } from '../store/useThemeStore';
import { LanguageContext } from '../context/LanguageContext';
import { use } from 'react';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { language } = use(LanguageContext);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 5.00;
  const tax = subtotal * 0.1;
  const orderTotal = subtotal + shipping + tax;

  return (
    <div className={`container mx-auto p-4 ${theme === 'light' ? 'bg-gray-50' : ' text-white'}`}>
      <h1 className="text-3xl font-bold mb-6">{language === 'en' ? 'Shopping Cart' : 'عربة التسوق'}</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-20">
            <p className="text-xl">{language === 'en' ? 'Your cart is empty.' : 'عربتك فارغة.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="flex justify-end mb-4">
                    <Button variant="destructive" onClick={handleClearCart}>
                        Clear Cart
                    </Button>
                </div>
                <div className="space-y-4">
                {cartItems.map(item => (
                    <Card key={item.id} className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                    <CardContent className={theme === 'light' ? 'flex items-center p-4' : 'flex items-center p-4 text-white'}>
                        <img src={item.image} alt={item.title} className="w-24 h-24 object-contain mr-4" />
                        <div className="flex-grow">
                        <h2 className="font-semibold">{item.title}</h2>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center">
                        <Button variant="ghost" size="icon" onClick={() => handleDecreaseQuantity(item.id)}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-4">{item.quantity}</span>
                        <Button variant="ghost" size="icon" onClick={() => handleIncreaseQuantity(item.id)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                        </div>
                        <Button variant="ghost" size="icon" className="ml-4" onClick={() => handleRemoveFromCart(item.id)}>
                        <Trash2 className="h-5 w-5 text-red-500" />
                        </Button>
                    </CardContent>
                    </Card>
                ))}
                </div>
            </div>
            <div className={`p-6 rounded-lg shadow-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className={`border-t my-2 ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}></div>
                    <div className="flex justify-between font-bold text-lg">
                        <span>Order Total</span>
                        <span>${orderTotal.toFixed(2)}</span>
                    </div>
                </div>
                <Button className="w-full mt-6">Checkout</Button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Cart;