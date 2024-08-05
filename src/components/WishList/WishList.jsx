import React, { useContext, useEffect, useState } from 'react';
import { WishListContext } from '../../Context/WishListContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CardContext';
import { BeatLoader } from 'react-spinners';

export default function WishList() {
    const [wishListDetails, setWishListDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { getLoggedUserWishList, removeProductFromWishList } = useContext(WishListContext);
    const { addProductToCart } = useContext(CartContext);

    useEffect(() => {
        getWishList();
    }, []);

    async function getWishList() {
        setIsLoading(true);
        try {
            const response = await getLoggedUserWishList();
            setWishListDetails(response?.data?.data);
        } catch (error) {
            toast.error('Failed to load wishlist.');
        } finally {
            setIsLoading(false);
        }
    }

    async function removeProduct(productId) {
        try {
            const response = await removeProductFromWishList(productId);
            if (response.data.status) {
                setWishListDetails(prevDetails => prevDetails.filter(product => product.id !== productId));
                toast.success(response.data.message, { duration: 1000 });
            } else {
                toast.error(response.data.message, { duration: 1000 });
            }
        } catch (error) {
            toast.error('Failed to remove product from wishlist.', { duration: 1000 });
        }
    }

    async function addProduct(productId) {
        try {
            const response = await addProductToCart(productId);
            if (response.data.status) {
                toast.success(response.data.message, { duration: 1000 });
            } else {
                toast.error(response.data.message, { duration: 1000 });
            }
        } catch (error) {
            toast.error('Failed to add product to cart.', { duration: 1000 });
        }
    }

    return (
        <>
            <Helmet>
                <title>FreshCart - WishList</title>
            </Helmet>
            <div className="relative overflow-x-auto sm:rounded-lg">
                <h2 className="text-center text-green-500 py-4 text-4xl">My Wish List</h2>
                {isLoading ? (
                    <div className="py-8 w-full flex justify-center">
                        <BeatLoader color="green" />
                    </div>
                ) : (
                    <>
                        {wishListDetails && wishListDetails.length > 0 ? (
                            <table className="w-3/4 mx-auto my-6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-600 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-16 py-3">
                                            <span className="sr-only">Image</span>
                                        </th>
                                        <th scope="col" className="px-6 py-3">Product</th>
                                        <th scope="col" className="px-6 py-3">Price</th>
                                        <th scope="col" className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wishListDetails.map(product => (
                                        <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="p-4">
                                                <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.title} />
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {product.title ? product.title.split(' ').slice(0, 2).join(' ') : null}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                <span>{product.price}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <div onClick={() => removeProduct(product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline mb-4">Remove</div>
                                                    <div onClick={() => addProduct(product.id)} className="cursor-pointer font-medium text-green-600 dark:text-green-500 hover:underline">Add To Cart</div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div id="alert-border-5" className="my-10 flex flex-col items-center w-1/2 mx-auto p-4 border-b-4 border-gray-300 rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-600" role="alert">
                                <div className="ms-3 text-3xl font-medium text-gray-600 dark:text-gray-300">
                                    There are no products in your wishlist.
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
