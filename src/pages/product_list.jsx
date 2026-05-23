import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardFooter } from './../components/ui/card';
import { Field } from './../components/ui/field';
import { Input } from './../components/ui/input';
import { Skeleton } from './../components/ui/skeleton';
import { Search } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ShoppingCart, Star , Eye} from 'lucide-react';
import { instance } from '../components/Axios_Instance';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '../store/useThemeStore';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { LanguageContext } from '../context/LanguageContext';
import { use } from 'react';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState(null);
  const searchTerm = useRef("");
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);
  const category = searchParams.get('category');
  const { language  } = use(LanguageContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setisloading(true);
        const response = await instance.get('/');
        const data = response.data;
        setproducts(data);
        category ? setFilteredProducts(data.filter((product) => product.category === category)) : setFilteredProducts(data);
      } catch (error) {
        seterror(error);
      } finally {
        setisloading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilter = (newCategory) => {
    const searchTermValue = searchTerm.current.value || '';
    const filtered = newCategory 
      ? products.filter((product) => product.category === newCategory && product.title.toLowerCase().includes(searchTermValue.toLowerCase()))
      : products.filter((product) => product.title.toLowerCase().includes(searchTermValue.toLowerCase()));
    setFilteredProducts(filtered);
    setSearchParams(newCategory ? { category: newCategory } : {});
  };

  const truncateText = (text, limit = 80) => {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const getCategoryColor = (category) => {
    const colors = {
      "men's clothing": "bg-teal-100 text-teal-800",
      "women's clothing": "bg-pink-100 text-pink-800",
      "jewelery": "bg-purple-100 text-purple-800",
      "electronics": "bg-gray-100 text-gray-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
     <div className={theme === 'light' ? 'bg-gradient-to-br from-gray-50 to-gray-100' : 'bg-gradient-to-br from-gray-800 to-gray-900 text-white min-h-screen'}>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className={theme === 'light' ? 'text-4xl font-bold text-gray-900 mb-2' : 'text-4xl font-bold text-white mb-2'}>
            {category ? `${language === 'en' ? 'Currently Browsing' : 'تصفح حاليا'}: ${category}` : (language === 'en' ? 'Our Products' : 'منتجاتنا')}
          </h1>
          <p className='text-gray-600'>{language === 'en' ? 'Discover our amazing collection' : 'اكتشف مجموعتنا المذهلة'}</p>
        </div>

        <div className="flex space-x-4 mb-8">
          <Button onClick={() => handleFilter(null)}  className={ !category ? theme === 'light' ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-teal-600 text-white hover:bg-teal-300' : 'bg-gray-700 text-white hover:bg-gray-600'}>All Products</Button>
          <Button onClick={() => handleFilter('electronics')} className={ category === 'electronics' ?  theme === 'light' ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-teal-600 text-white hover:bg-tealo-300' : 'bg-gray-700 text-white hover:bg-gray-600'}>Electronics</Button>
          <Button onClick={() => handleFilter("women's clothing")}  className={category === "women's clothing" ? theme === 'light' ?  'bg-teal-600 text-white hover:bg-teal-700' : 'bg-teal-600 text-white hover:bg-teal-300' : 'bg-gray-700 text-white hover:bg-gray-600'}>Women's Clothing</Button>
        </div>

        <div className='mb-8 min-w-60'>
          <Field orientation="horizontal" className="relative">
            <div className="relative w-full shadow-sm rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search for products..."
                className="pl-10 py-6 text-md w-full bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all"
                onChange={(e) => {
                  const newProducts = products.filter((product) => product.title.toLowerCase().includes(e.target.value.toLowerCase()) && (!category || product.category === category));
                  setFilteredProducts(newProducts);
                }}
                ref={searchTerm}
              />
            </div>
          </Field>
        </div>

        {error && (
          <div className='bg-red-50 border border-red-200 rounded-lg p-4 text-red-800'>
            ❌ Failed to fetch products
          </div>
        )}

        {isloading && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className='group h-full'>
                <Card className={theme === 'light' ? 'relative overflow-hidden h-full flex flex-col shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white' : 'relative overflow-hidden h-full flex flex-col shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gray-800 text-white'}>
                  <Skeleton className="h-48 w-full" />
                  <CardHeader className='pb-2 flex-grow'>
                    <Skeleton className="h-4 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <div className='px-4 py-2 bg-gray-50 border-t border-gray-200'>
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                  <CardFooter className='pt-3 border-t'>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}

        {!error && !isloading && filteredProducts.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredProducts.map((product) => (
              <div key={product.id} className='group h-full'>
                <Card className={theme === 'light' ? 'relative overflow-hidden h-full flex flex-col shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white' : 'relative overflow-hidden h-full flex flex-col shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gray-800 text-white'}>
                  <div className='relative overflow-hidden bg-gray-200 h-48 flex items-center justify-center'>
                    <img
                      src={product.image}
                      alt={product.title}
                      className={theme === 'light' ? 'max-h-full w-auto object-contain group-hover:scale-110 transition-transform duration-300' : 'max-h-full w-auto object-contain group-hover:scale-110 transition-transform duration-300'}
                    />

                    <div className='absolute top-3 right-3 bg-white rounded-lg shadow-lg p-2'>
                      <p className='text-lg font-bold text-teal-600 '>${product.price}</p>
                    </div>
                  </div>


                  <CardHeader className='pb-2 flex-grow'>
                    <div className='mb-2'>
                      <Badge className={`${getCategoryColor(product.category)} capitalize`}>
                        {product.category}
                      </Badge>
                    </div>

                    <CardTitle className={theme === 'light' ? 'text-lg font-semibold text-gray-900 mb-2' : 'text-lg font-semibold text-white mb-2'}>
                      {product.title}
                    </CardTitle>


                    <CardDescription className={theme === 'light' ? 'text-sm text-gray-600 line-clamp-2' : 'text-sm text-gray-300 line-clamp-2'}>
                      {truncateText(product.description, 80)}
                    </CardDescription>
                  </CardHeader>


                  <div className={theme === 'light' ? 'px-4 py-2 bg-gray-50 border-t border-gray-200' : 'px-4 py-2 bg-gray-700 border-t border-gray-600'}>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-1'>
                        <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                        <span className='font-semibold text-sm'>{product.rating.rate}</span>
                        <span className='text-gray-500 text-xs'>({product.rating.count})</span>
                      </div>
                    </div>
                  </div>


                  <CardFooter className={theme === 'light' ? 'pt-3 border-t bg-white' : 'pt-3 border-t bg-gray-800 text-white'}>
                    <Button
                      variant="outline"
                      size="sm"
                      className= 'text-white py-5 bg-teal-600  hover:bg-teal-700 hover:text-white flex items-center justify-center gap-2 transition-colors'
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => navigate(`/products/${product.id}`)}
                      className='py-5  hover:bg-gray-200 text-gray-800 flex items-center justify-center gap-2 transition-colors'
                      variant='secondary'
                    >
                      <Eye className='w-4 h-4' />
                      View
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}

        {!error && !isloading && filteredProducts.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>No products found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList;



