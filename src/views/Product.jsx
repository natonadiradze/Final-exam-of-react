import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getProductById, getProductsByCategory} from "../utils/api.js";
import {useSelector, useDispatch} from 'react-redux';
import {addProduct} from "../redux/slices/cartSlice.js";
import Loader from "../components/Loader.jsx";
import SuccessMsg from "../components/SuccessMsg.jsx";
import {addFavorite} from "../redux/slices/favoriteSlice.js";
import {modalOpen} from "../redux/slices/modalSlice.js";

const Product = () => {
    const [product, setProduct] = useState(null);
    const [similarProduct, setSimilarProduct] = useState([]);
    const [count, setCount] = useState(1);
    const [isMouse, setIsMouse] = useState(false);
    const [isProductAdded, setIsProductAdded] = useState(false);
    const [successMsg, setSuccessMsg] = useState('')

    const {id} = useParams();
    const navigate = useNavigate()

    const category = new URLSearchParams(window.location.search).get('category');
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const isFavorite = useSelector((state) => state.favorite.favorite);
    const cartItems = useSelector(state => state.cart.cartItems)

    const handleAddToCart = () => {
        let quantity = count;

        const existingProductIndex = cartItems.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            setIsProductAdded(true)
            setSuccessMsg('Product is already in the cart')

            setTimeout(() => {
                setIsProductAdded(false);
            }, 3000);

        } else {
            dispatch(addProduct({product, quantity}));
            setIsProductAdded(true);
            setSuccessMsg('Product added successfully.')

            setTimeout(() => {
                setIsProductAdded(false);
            }, 3000);
        }
    };

    const openLoginModal = () => {
        dispatch(modalOpen(true))
    };

    const toggleFavorite = (product) => {
        dispatch(addFavorite(product));
    };

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1);
    };

    const decrementCount = () => {
        if (count > 1) {
            setCount(prevCount => prevCount - 1);
        }
    };

    const getSimilarProducts = async () => {
        try {
            const productsData = await getProductsByCategory(category);
            let filterData = productsData.filter(item => item.id !== parseInt(id))
            setSimilarProduct(filterData)
        } catch (error) {
            console.error('Error while fetching products:', error);
        }
    };

    useEffect(() => {
        getSimilarProducts()
    }, [product])


    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await getProductById(id)
                setProduct(response);
            } catch (error) {
                console.error('Error while fetching product details', error);
            }
        };

        getProduct();
    }, [id]);

    useEffect(() => {
        const cartItem = cartItems.find(item => item.id === parseInt(id));
        if (cartItem) {
            setCount(cartItem.quantity);
        }
    }, [cartItems, id]);

    const handleSvgOver = () => {
        setIsMouse(true)
    }

    const handleSvgLeave = () => {
        setIsMouse(false)
    }

    const detailProduct = (id, category) => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        navigate(`/products/${id}?category=${category}`)
    }

    if (!product) {
        return <div className='min-h-screen w-full'><Loader/></div>;
    }

    return (
        <div className='container mx-auto mt-20 relative'>
            {
                isProductAdded ? <SuccessMsg msg={successMsg} setIsProductAdded={setIsProductAdded}/> : <></>
            }
            <div className='flex flex-col lg:flex-row justify-center items-center mb-24'>
                <div className='flex flex-col items-center w-full '>
                    <img src={product.image} alt={'image'} className='max-w-[400px] h-[396px]'/>

                    <div className='mt-4 flex max-w-[450px] mx-auto lg:mx-0 justify-between space-x-4 items-center '>
                        <div
                            className='rounded-sm rotate-180 w-[32px] h-[32px] flex justify-center items-center border border-solid border-[#DFE3E8]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none">
                                <path
                                    d="M7.83997 7.41L12.42 12L7.83997 16.59L9.24997 18L15.25 12L9.24997 6L7.83997 7.41Z"
                                    fill="#C4CDD5"/>
                            </svg>
                        </div>
                        <div
                            className='flex items-center justify-center max-w-[400px] mx-auto lg:mx-0 md:w-full space-x-4 lg:space-x-8 w-full'>
                            {Array.from({length: 3}, (_, index) => (
                                <img
                                    key={index}
                                    src={product.image}
                                    alt={`Image ${index + 1}`}
                                    className='rounded-md lg:w-[87px] lg:h-[124px] w-[44px] h-[60px]'
                                />
                            ))}
                        </div>
                        <div
                            className='rounded-sm w-[32px] h-[32px] flex justify-center items-center border border-solid border-[#DFE3E8]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none">
                                <path
                                    d="M7.83997 7.41L12.42 12L7.83997 16.59L9.24997 18L15.25 12L9.24997 6L7.83997 7.41Z"
                                    fill="#C4CDD5"/>
                            </svg>
                        </div>
                    </div>

                </div>

                <div className='w-full lg:w-1/2 mt-12 lg:mt-0 p-4 md:p-0'>
                    <div className='max-w-[400px] mx-auto lg:mx-0 lg:w-full'>
                        <h1 className='font-poppins text-lg md:text-xl  font-medium  leading-8 lg:leading-10 text-black'>{product.title}</h1>
                    </div>
                    <div className='mt-4 max-w-[400px] mx-auto lg:mx-0 lg:w-full'>
                        <p className='font-poppins leading-8 lg:leading-10 text-base lg:text-xl text-[#3E5673] font-semibold'>${product.price}</p>
                    </div>
                    <div className='mt-4 max-w-[400px] mx-auto lg:mx-0 lg:w-full'>
                        <p className='font-poppins leading-8 lg:leading-10 text-base lg:text-md text-black font-medium tracking-wide'>${product.description}</p>
                    </div>

                    <div className='mt-4 flex-col m-2 max-w-[400px] mx-auto lg:mx-0 lg:w-full'>
                        <p className='font-roboto font-normal text-black tracking-tighter font-md'>Quantity</p>
                        <div
                            className='flex space-x-2 w-[60px] justify-center mt-2 items-center p-1 border border-solid border-[#3E5673]'>
                            <button onClick={incrementCount} className='text-md text-[#3E5673] font-roboto'>+</button>
                            <p className='text-[#1D252C] text-md font-roboto font-normal'>{count}</p>
                            <button onClick={decrementCount} className='text-md text-[#A7A7A7] font-roboto'>-</button>
                        </div>
                    </div>

                    <div className='mt-6 m-2 max-w-[400px] mx-auto lg:mx-0 lg:w-full'>
                        {
                            token ? (
                                <button onMouseOver={handleSvgOver} onMouseLeave={handleSvgLeave}
                                        onClick={handleAddToCart}
                                        className='border border-solid border-[#3E5673] px-12 transition-all duration-500 py-1 rounded-sm flex items-center text-normal text-[#3E5673] text-md hover:text-white hover:bg-modal-btn'>
                                    <svg className='mr-4' xmlns="http://www.w3.org/2000/svg" width="25" height="24"
                                         viewBox="0 0 25 24" fill="none">
                                        <g clipPath="url(#clip0_71_28)">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M0.761597 2.25C0.761597 2.05109 0.841068 1.86032 0.982529 1.71967C1.12399 1.57902 1.31585 1.5 1.51591 1.5H3.77884C3.9471 1.50005 4.11051 1.55603 4.24309 1.65904C4.37567 1.76205 4.4698 1.90618 4.51052 2.0685L5.12151 4.5H22.6366C22.7481 4.50007 22.8583 4.52474 22.9591 4.57223C23.0599 4.61972 23.1489 4.68885 23.2196 4.77465C23.2903 4.86044 23.341 4.96076 23.368 5.06838C23.395 5.176 23.3977 5.28823 23.3758 5.397L21.8672 12.897C21.8342 13.0605 21.7473 13.2085 21.6202 13.3174C21.4932 13.4264 21.3332 13.4901 21.1657 13.4985L6.98918 14.2065L7.42215 16.5H20.3737C20.5737 16.5 20.7656 16.579 20.907 16.7197C21.0485 16.8603 21.128 17.0511 21.128 17.25C21.128 17.4489 21.0485 17.6397 20.907 17.7803C20.7656 17.921 20.5737 18 20.3737 18H6.79608C6.62022 17.9998 6.44995 17.9386 6.31469 17.8268C6.17944 17.7151 6.0877 17.5599 6.05535 17.388L3.79392 5.4105L3.19048 3H1.51591C1.31585 3 1.12399 2.92098 0.982529 2.78033C0.841068 2.63968 0.761597 2.44891 0.761597 2.25ZM5.44134 6L6.70858 12.7185L20.5034 12.03L21.7163 6H5.44134ZM8.3047 18C7.50448 18 6.73703 18.3161 6.17119 18.8787C5.60534 19.4413 5.28746 20.2044 5.28746 21C5.28746 21.7956 5.60534 22.5587 6.17119 23.1213C6.73703 23.6839 7.50448 24 8.3047 24C9.10492 24 9.87237 23.6839 10.4382 23.1213C11.0041 22.5587 11.3219 21.7956 11.3219 21C11.3219 20.2044 11.0041 19.4413 10.4382 18.8787C9.87237 18.3161 9.10492 18 8.3047 18ZM18.865 18C18.0648 18 17.2974 18.3161 16.7315 18.8787C16.1657 19.4413 15.8478 20.2044 15.8478 21C15.8478 21.7956 16.1657 22.5587 16.7315 23.1213C17.2974 23.6839 18.0648 24 18.865 24C19.6653 24 20.4327 23.6839 20.9985 23.1213C21.5644 22.5587 21.8823 21.7956 21.8823 21C21.8823 20.2044 21.5644 19.4413 20.9985 18.8787C20.4327 18.3161 19.6653 18 18.865 18ZM8.3047 19.5C7.90459 19.5 7.52086 19.658 7.23794 19.9393C6.95502 20.2206 6.79608 20.6022 6.79608 21C6.79608 21.3978 6.95502 21.7794 7.23794 22.0607C7.52086 22.342 7.90459 22.5 8.3047 22.5C8.70481 22.5 9.08853 22.342 9.37145 22.0607C9.65437 21.7794 9.81332 21.3978 9.81332 21C9.81332 20.6022 9.65437 20.2206 9.37145 19.9393C9.08853 19.658 8.70481 19.5 8.3047 19.5ZM18.865 19.5C18.4649 19.5 18.0812 19.658 17.7983 19.9393C17.5154 20.2206 17.3564 20.6022 17.3564 21C17.3564 21.3978 17.5154 21.7794 17.7983 22.0607C18.0812 22.342 18.4649 22.5 18.865 22.5C19.2652 22.5 19.6489 22.342 19.9318 22.0607C20.2147 21.7794 20.3737 21.3978 20.3737 21C20.3737 20.6022 20.2147 20.2206 19.9318 19.9393C19.6489 19.658 19.2652 19.5 18.865 19.5Z"
                                                  fill={isMouse ? '#FFF' : '#3E5673'}/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_71_28">
                                                <rect width="24.1379" height="24" fill="white"
                                                      transform="translate(0.761597)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    + Add to cart
                                </button>
                            ) : (
                                <button onMouseOver={handleSvgOver} onMouseLeave={handleSvgLeave}
                                        onClick={openLoginModal}
                                        className='border border-solid border-[#3E5673] px-12 transition-all duration-500 py-1 rounded-sm flex items-center text-normal text-[#3E5673] text-md hover:text-white hover:bg-modal-btn'>
                                    <svg className='mr-4' xmlns="http://www.w3.org/2000/svg" width="25" height="24"
                                         viewBox="0 0 25 24" fill="none">
                                        <g clipPath="url(#clip0_71_28)">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M0.761597 2.25C0.761597 2.05109 0.841068 1.86032 0.982529 1.71967C1.12399 1.57902 1.31585 1.5 1.51591 1.5H3.77884C3.9471 1.50005 4.11051 1.55603 4.24309 1.65904C4.37567 1.76205 4.4698 1.90618 4.51052 2.0685L5.12151 4.5H22.6366C22.7481 4.50007 22.8583 4.52474 22.9591 4.57223C23.0599 4.61972 23.1489 4.68885 23.2196 4.77465C23.2903 4.86044 23.341 4.96076 23.368 5.06838C23.395 5.176 23.3977 5.28823 23.3758 5.397L21.8672 12.897C21.8342 13.0605 21.7473 13.2085 21.6202 13.3174C21.4932 13.4264 21.3332 13.4901 21.1657 13.4985L6.98918 14.2065L7.42215 16.5H20.3737C20.5737 16.5 20.7656 16.579 20.907 16.7197C21.0485 16.8603 21.128 17.0511 21.128 17.25C21.128 17.4489 21.0485 17.6397 20.907 17.7803C20.7656 17.921 20.5737 18 20.3737 18H6.79608C6.62022 17.9998 6.44995 17.9386 6.31469 17.8268C6.17944 17.7151 6.0877 17.5599 6.05535 17.388L3.79392 5.4105L3.19048 3H1.51591C1.31585 3 1.12399 2.92098 0.982529 2.78033C0.841068 2.63968 0.761597 2.44891 0.761597 2.25ZM5.44134 6L6.70858 12.7185L20.5034 12.03L21.7163 6H5.44134ZM8.3047 18C7.50448 18 6.73703 18.3161 6.17119 18.8787C5.60534 19.4413 5.28746 20.2044 5.28746 21C5.28746 21.7956 5.60534 22.5587 6.17119 23.1213C6.73703 23.6839 7.50448 24 8.3047 24C9.10492 24 9.87237 23.6839 10.4382 23.1213C11.0041 22.5587 11.3219 21.7956 11.3219 21C11.3219 20.2044 11.0041 19.4413 10.4382 18.8787C9.87237 18.3161 9.10492 18 8.3047 18ZM18.865 18C18.0648 18 17.2974 18.3161 16.7315 18.8787C16.1657 19.4413 15.8478 20.2044 15.8478 21C15.8478 21.7956 16.1657 22.5587 16.7315 23.1213C17.2974 23.6839 18.0648 24 18.865 24C19.6653 24 20.4327 23.6839 20.9985 23.1213C21.5644 22.5587 21.8823 21.7956 21.8823 21C21.8823 20.2044 21.5644 19.4413 20.9985 18.8787C20.4327 18.3161 19.6653 18 18.865 18ZM8.3047 19.5C7.90459 19.5 7.52086 19.658 7.23794 19.9393C6.95502 20.2206 6.79608 20.6022 6.79608 21C6.79608 21.3978 6.95502 21.7794 7.23794 22.0607C7.52086 22.342 7.90459 22.5 8.3047 22.5C8.70481 22.5 9.08853 22.342 9.37145 22.0607C9.65437 21.7794 9.81332 21.3978 9.81332 21C9.81332 20.6022 9.65437 20.2206 9.37145 19.9393C9.08853 19.658 8.70481 19.5 8.3047 19.5ZM18.865 19.5C18.4649 19.5 18.0812 19.658 17.7983 19.9393C17.5154 20.2206 17.3564 20.6022 17.3564 21C17.3564 21.3978 17.5154 21.7794 17.7983 22.0607C18.0812 22.342 18.4649 22.5 18.865 22.5C19.2652 22.5 19.6489 22.342 19.9318 22.0607C20.2147 21.7794 20.3737 21.3978 20.3737 21C20.3737 20.6022 20.2147 20.2206 19.9318 19.9393C19.6489 19.658 19.2652 19.5 18.865 19.5Z"
                                                  fill={isMouse ? '#FFF' : '#3E5673'}/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_71_28">
                                                <rect width="24.1379" height="24" fill="white"
                                                      transform="translate(0.761597)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    + Add to cart
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='ml-4'>
                <p className=' text-center lg:text-start text-main-text font-glaho text-xl font-normal'>Similar products
                </p>
            </div>

            <div className='flex flex-wrap space-x-12 justify-center lg:justify-start mt-4 ml-4 mb-20'>
                {similarProduct.length > 0 ? (
                    similarProduct.map((item) => (
                        <div className='relative' key={item.id}>
                            <div className='max-w-[225px] cursor-pointer'
                                 onClick={() => detailProduct(item.id, item.category)}>
                                <img src={item.image} alt='product img' className='w-full h-[280px]'/>
                                <div>
                                    <p className='font-glaho text-sort-table-dark text-sm font-normal pl-3 h-[40px]'>{item.title}</p>
                                    <div className='flex mt-5 justify-between items-center ml-3 mb-3 '>
                                        <div>
                                            <p className='font-glaho text-sm font-normal text-[#4B5563]'>${item.price}</p>
                                        </div>
                                        <div>
                                            <p className='font-glaho text-sm font-normal text-[#4B5563] pr-3'>24
                                                orders</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {token !== null && (
                                <div>
                                    <div
                                        className='w-[30px] h-[30px] bg-heart-bg flex items-center justify-center absolute right-5 top-6 z-10'
                                        style={{backdropFilter: 'blur(15.063480377197266px)'}}>
                                        <svg className='cursor-pointer' onClick={() => toggleFavorite(item)}
                                             xmlns='http://www.w3.org/2000/svg' width='19' height='19'
                                             viewBox='0 0 19 19'
                                             fill={isFavorite.some((favItem) => favItem.id === item.id) ? 'red' : 'none'}>
                                            <g clipPath="url(#clip0_1_520)">
                                                <path
                                                    d="M16.2235 3.56152C15.8388 3.17665 15.382 2.87135 14.8793 2.66305C14.3766 2.45475 13.8378 2.34753 13.2936 2.34753C12.7494 2.34753 12.2106 2.45475 11.7079 2.66305C11.2052 2.87135 10.7484 3.17665 10.3638 3.56152L9.5654 4.35988L8.76703 3.56152C7.98999 2.78448 6.93609 2.34794 5.83719 2.34794C4.73828 2.34794 3.68438 2.78448 2.90734 3.56152C2.13029 4.33856 1.69376 5.39246 1.69376 6.49137C1.69376 7.59027 2.13029 8.64417 2.90734 9.42121L3.7057 10.2196L9.5654 16.0793L15.4251 10.2196L16.2235 9.42121C16.6083 9.03653 16.9136 8.57978 17.1219 8.07706C17.3302 7.57435 17.4374 7.03552 17.4374 6.49137C17.4374 5.94721 17.3302 5.40838 17.1219 4.90567C16.9136 4.40295 16.6083 3.94621 16.2235 3.56152V3.56152Z"
                                                    stroke="white" strokeWidth="1.50635" strokeLinecap="round"
                                                    strokeLinejoin="round"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1_520">
                                                    <rect width="18.0762" height="18.0762" fill="white"
                                                          transform="translate(0.527344 0.0891113)"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <></>
                )}

            </div>
        </div>
    );
};

export default Product;