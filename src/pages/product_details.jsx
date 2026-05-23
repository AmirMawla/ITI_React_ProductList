import React from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { instance } from '../components/Axios_Instance';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Star } from 'lucide-react';
import { Skeleton } from '../components/ui/skeleton';



const ProductDetails = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const response = await instance.get(`/${id}`);
                setProduct(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const getCategoryColor = (category) => {
        const colors = {
            "men's clothing": "bg-teal-100 text-teal-800",
            "women's clothing": "bg-pink-100 text-pink-800",
            "jewelery": "bg-purple-100 text-purple-800",
            "electronics": "bg-gray-100 text-gray-800"
        };
        return colors[category] || "bg-gray-100 text-gray-800";
    };

    const renderRating = (rating) => {
        if (!rating) return null;
        const stars = [];
        const fullStars = Math.floor(rating.rate);
        const hasHalfStar = rating.rate % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Star key={`full-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<Star key="half" className="h-5 w-5 fill-yellow-200 text-yellow-400" />);
            } else {
                stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />);
            }
        }
        return stars;
    };

    return (
        <>
            <div className='bg-gradient-to-br from-gray-50 to-gray-100 min-h-100vh p-6'>


                {isLoading && (
                    <div className="container mx-auto my-12 p-6">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div>
                                    <Skeleton className="h-[450px] w-full rounded-lg" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <Skeleton className="h-8 w-3/4 mb-4" />
                                    <Skeleton className="h-6 w-1/4 mb-6" />
                                    <div className="flex items-center mb-6">
                                        <Skeleton className="h-5 w-28" />
                                        <Skeleton className="ml-2 h-5 w-24" />
                                    </div>
                                    <Skeleton className="h-20 w-full mb-8" />
                                    <div className="flex items-center justify-between border-t pt-6">
                                        <Skeleton className="h-12 w-32" />
                                        <Skeleton className="h-12 w-40" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {
                    error &&
                    (
                        <div className="p-4 text-center text-red-500">❌ Failed to fetch product</div>
                    )
                }


                {
                    product &&
                    (
                        <div className="container mx-auto my-12 p-6">
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8">
                                        <img
                                            className="max-h-[450px] w-auto object-contain"
                                            src={product.image}
                                            alt={product.title}
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <Badge className={`${getCategoryColor(product.category)} mb-4 self-start`}>{product.category}</Badge>
                                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
                                        <div className="flex items-center mb-6">
                                            <div className="flex items-center">
                                                {renderRating(product.rating)}
                                            </div>
                                            <p className="ml-3 text-sm font-medium text-gray-500">{product.rating.rate}/5 ({product.rating.count} reviews)</p>
                                        </div>
                                        <p className="text-gray-700 mb-8">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center justify-between border-t pt-6">
                                            <h1 className="text-4xl font-bold text-teal-600">${product.price.toFixed(2)}</h1>
                                            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-6 cursor-pointer">Add to Cart</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                }
            </div>
        </>
    );
}

export default ProductDetails;



