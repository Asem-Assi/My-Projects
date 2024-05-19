import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from 'react-icons/md';

const Wishlist = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadingCart = new Array(4).fill(null);

    const fetchData = async () => {
        try {
            const response = await fetch(SummaryApi.getAllWishlist.url, {
                method: SummaryApi.getAllWishlist.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
            });

            const responseData = await response.json();
            console.log(responseData,'heeeeree');

            if (responseData.success) {
                setData(responseData.data);
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };

    const deleteWishlistItem = async (id) => {
        try {
            const response = await fetch(SummaryApi.deleteWishlist.url, {
                method: SummaryApi.deleteWishlist.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    
                    productId: id,
                }),
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
            }
        } catch (error) {
            console.error('Error deleting wishlist item:', error);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
        setLoading(false);
    }, []);

    return (
        <div className="w-full max-w-3xl">
            {loading ? (
                loadingCart.map((el, index) => (
                    <div key={`loading-${index}`} className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"></div>
                ))
            ) : (
                data.map((product) => (
                    <div key={product._id} className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]">
                        <div className="w-32 h-32 bg-slate-200">
                            <img src={product.productImage[0]} className="w-full h-full object-scale-down mix-blend-multiply" alt="Product" />
                        </div>
                        <div className="px-4 py-2 relative">
                            <div className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer" onClick={() => deleteWishlistItem(product._id)}>
                                <MdDelete />
                            </div>
                            <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">{product.productName}</h2>
                            <p className="capitalize text-slate-500">{product.category}</p>
                            <div className="flex items-center justify-between">
                                <p className="text-red-600 font-medium text-lg">{displayINRCurrency(product.sellingPrice)}</p>
                                <p className="text-slate-600 font-semibold text-lg">{displayINRCurrency(product.sellingPrice * product.quantity)}</p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Wishlist;
