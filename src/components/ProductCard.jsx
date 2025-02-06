import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addFavorite } from '../redux/slices/favoriteSlice.js';
import {addProduct,deleteById} from "../redux/slices/cartSlice.js";

const ProductCard = ({  id, category, product }) => {
    const token = useSelector((state) => state.auth.token);
    const cartItems = useSelector((state) => state.cart.cartItems);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isFavorite = useSelector((state) =>
        state.favorite.favorite.some((item) => item.id === product.id)
    );

    const toggleFavorite = () => {
        const existingCartItem = cartItems.find(item => item.id === id);

        if (existingCartItem) {
            dispatch(deleteById(id));
        } else {
            dispatch(addProduct({ product, quantity: 1 }));
        }
        dispatch(addFavorite(product));
    };

    const detailProduct = () => {
        navigate(`/products/${id}?category=${category}`);
    };

    return (
        <div className='relative'>
            {token !== null ? (
                <div
                    onClick={toggleFavorite}
                    className='w-[30px] h-[30px] bg-heart-bg flex items-center justify-center absolute right-5 top-6'
                    style={{ backdropFilter: 'blur(15.063480377197266px)' }}
                >
                    <svg xmlns='http://www.w3.org/2000/svg' className='cursor-pointer' width='19' height='19' viewBox='0 0 19 19' fill={isFavorite ? 'red' : 'none'}>
                        <g clipPath="url(#clip0_1_520)">
                            <path d="M16.2235 3.56152C15.8388 3.17665 15.382 2.87135 14.8793 2.66305C14.3766 2.45475 13.8378 2.34753 13.2936 2.34753C12.7494 2.34753 12.2106 2.45475 11.7079 2.66305C11.2052 2.87135 10.7484 3.17665 10.3638 3.56152L9.5654 4.35988L8.76703 3.56152C7.98999 2.78448 6.93609 2.34794 5.83719 2.34794C4.73828 2.34794 3.68438 2.78448 2.90734 3.56152C2.13029 4.33856 1.69376 5.39246 1.69376 6.49137C1.69376 7.59027 2.13029 8.64417 2.90734 9.42121L3.7057 10.2196L9.5654 16.0793L15.4251 10.2196L16.2235 9.42121C16.6083 9.03653 16.9136 8.57978 17.1219 8.07706C17.3302 7.57435 17.4374 7.03552 17.4374 6.49137C17.4374 5.94721 17.3302 5.40838 17.1219 4.90567C16.9136 4.40295 16.6083 3.94621 16.2235 3.56152V3.56152Z" stroke="white" strokeWidth="1.50635" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_1_520">
                                <rect width="18.0762" height="18.0762" fill="white" transform="translate(0.527344 0.0891113)"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            ) : (
                <></>
            )}
            <div className='max-w-[240px] cursor-pointer mt-8' onClick={detailProduct}>
                <img src={product.image} alt='product img' className='w-full h-[280px]' />
                <p className='font-glaho  text-sort-table-dark text-sm font-normal pl-3 mt-1  h-[60px]'>{product.title}</p>

                <div className='flex justify-between items-center ml-3  mb-3 '>
                    <div>
                        <p className='font-glaho text-sm font-normal text-[#4B5563] '>${product.price}</p>
                    </div>
                    <div>
                        <p className='font-glaho text-sm font-normal text-[#4B5563] pr-3'>24 orders</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
