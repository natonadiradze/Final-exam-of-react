import {addProduct, calculateTotal, clearAllProduct, deleteById} from "../redux/slices/cartSlice.js";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {deleteFavoriteById} from "../redux/slices/favoriteSlice.js";

const CartItems = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalPrice = useSelector((state) => state.cart.totalPrice);


    const incrementCount = (productId) => {
        dispatch(addProduct({product: cartItems.find(item => item.id === productId), quantity: 1}));
    }

    const decrementCount = (productId, quantity) => {
        if (quantity > 1) {
            dispatch(addProduct({product: cartItems.find(item => item.id === productId), quantity: -1}));
        }
    }

    const clearItems = () => {
        dispatch(clearAllProduct([]))
    }

    const clearItem = (productId) => {
        dispatch(deleteFavoriteById(productId))
        dispatch(deleteById(productId))
    }

    useEffect(() => {
        dispatch(calculateTotal());
    }, [dispatch, cartItems]);

    if (cartItems.length === 0) {
        return (
            <div className='container mx-auto min-h-[600px] flex items-center justify-center '>
                <div
                    className="p-6 flex justify-center flex-col items-center w-[400px] h-[200px] mx-auto bg-white rounded-md shadow-md">
                    <p className="text-gray-700 text-xxl">Product not added yet</p>
                    <Link to={'/allproduct'}>
                        <button
                            className='border border-solid border-[#3E5673] px-12 mt-4 transition-all duration-500 py-1 rounded-sm flex items-center text-normal text-[#3E5673] text-md hover:text-white hover:bg-modal-btn'>Go
                            To Products
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='container mx-auto min-h-[600px] mb-12 mt-12'>
            <div>
                {cartItems.map((item) => (
                    <div className='flex flex-col lg:flex-row space-x-8 items-center w-ful mt-12' key={item.id}>
                        <img src={item.image} alt={'image'} className='w-[180px] h-[160px]'/>

                        <div className='flex flex-col lg:flex-row space-x-8 items-center'>
                            <div className='flex flex-col justify-center items-start w-[300px]'>
                                <p className='font-medium text-main-text text-lg font-roboto '>{item.title}</p>
                                <p className='font-poppins font-semibold text-xl text-main-text mt-7'>
                                    ${item.price * item.quantity}
                                </p>
                            </div>

                            <div className='flex flex-col justify-start'>
                                <p className='font-roboto font-normal text-black tracking-tighter font-md'>Quantity</p>
                                <div className='flex items-start space-x-12'>
                                    <div
                                        className='flex space-x-2 w-[60px] justify-center mt-2 items-center p-1 border border-solid border-[#3E5673]'>
                                        <button onClick={() => incrementCount(item.id, item.quantity)}
                                                className='text-md text-[#3E5673] font-roboto'>+
                                        </button>
                                        <p className='text-[#1D252C] text-md font-roboto font-normal'>{item.quantity}</p>
                                        <button onClick={() => decrementCount(item.id, item.quantity)}
                                                className='text-md text-[#A7A7A7] font-roboto'>-
                                        </button>
                                    </div>
                                    <button onClick={() => clearItem(item.id)}
                                            className='rounded-sm text-white h-[30px] font-roboto font-medium text-md px-4  bg-red-400 mr-24'>Delete
                                        Item
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            <p className='text-center lg:text-start mt-20 font-glaho font-normal text-xxl text-main-text'>
                Total: ${totalPrice.toFixed(2)}
            </p>

            <div className='container mx-auto flex justify-center md:justify-end mt-4 md:mt-0'>
                <button onClick={clearItems}
                        className='rounded-sm text-white font-roboto font-medium text-lg px-4 mr-4 py-1 bg-red-400'>Clear
                    Cart
                </button>
                <button
                    className='rounded-sm text-white font-roboto font-medium text-lg px-4 py-1 bg-[#3E5674] mr-0 lg:mr-24'>Checkout
                </button>
            </div>
        </div>
    );
};

export default CartItems;