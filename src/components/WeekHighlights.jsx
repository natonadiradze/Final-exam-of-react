import React from 'react';
import shoeImg from '../assets/images/week_high1.png'
import stylesImg from '../assets/images/week_high2.png'
import arrivalsImg from '../assets/images/new_arrivals_img.png'
import excItems from '../assets/images/eitems_img.png'
import {useNavigate} from "react-router-dom";

const WeekHighlights = () => {
    const navigate = useNavigate()
    return (
        <div className='mt-28 mx-24 flex-wrap mb-60'>
            <h2 className='font-normal text-main-text text-xl sm:text-3xl text-center leading-normal'>This
                Weeks <br></br>Highlights</h2>
            <div className='w-[60px] mx-auto mt-5 h-[3px] bg-black'></div>

            <div
                className='flex items-center flex-wrap justify-center xl:justify-between mt-12 2xl:justify-center 2xl:space-x-4'>
                <div onClick={() => navigate('/allproduct')}>
                    <div className='relative flex items-center justify-center cursor-pointer '>
                        <img src={shoeImg} alt='img'/>
                        <p className='absolute text-home-categories-title text-esm md:text-xxl font-normal top-4 sm:top-auto font-glaho text-center'>
                            Exclusive <br/> Shoes
                        </p>
                        <div
                            className='absolute bg-home-categories-blur-bg border-[1px] border-solid border-home-categories-blur-border left-1 bottom-1 xl:left-3 xl:bottom-3 '
                            style={{backdropFilter: 'blur(13.89px)'}}>
                            <div className='xl:ml-4 xl:mr-4 xl:mt-4 xl:mb-4 xl:pr-8'>
                                <p className='font-glaho font-normal text-home-categories-text text-xs'>Exclusive
                                    Shoes</p>
                                <p className='font-glaho font-normal text-home-categories-text text-[8px]'>PRICE 20%
                                    OFF</p>
                                <p className='font-glaho font-normal text-home-categories-text text-[10px] mt-2'>DISCOUNT
                                    CODE - VATR3920</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div onClick={() => navigate('/allproduct')}>
                    <div className='relative flex items-center mt-4 xl:mt-0 justify-center cursor-pointer'>
                        <img src={stylesImg} alt='img' className=''/>
                        <p className='absolute text-home-categories-title text-esm md:text-xxl font-normal top-4 sm:top-auto font-glaho text-center'>
                            Exquisite Styles & <br/> Collections
                        </p>
                        <div
                            className='absolute bg-home-categories-blur-bg border-[1px] border-solid xl:w-auto xl:h-auto border-home-categories-blur-border left-1 bottom-1 xl:left-3 xl:bottom-3 '
                            style={{backdropFilter: 'blur(13.89px)'}}>
                            <div className='xl:ml-4 xl:mr-4 xl:mt-4 xl:mb-4 xl:pr-8'>
                                <p className='font-glaho font-normal text-home-categories-text text-xs'>Exquisite Styles
                                    & Collections</p>
                                <p className='font-glaho font-normal text-home-categories-text text-[8px]'>PRICE 20%
                                    OFF</p>
                                <p className='font-glaho font-normal text-home-categories-text text-[10px] mt-2'>DISCOUNT
                                    CODE - VATR3920</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className='flex items-center flex-wrap justify-center xl:justify-between mt-4 xl:mt-12 2xl:justify-center 2xl:space-x-4'>

                <div onClick={() => navigate('/allproduct')}>
                    <div className='relative  flex items-center justify-center cursor-pointer'>
                        <img src={arrivalsImg} alt='img'/>
                        <p className='absolute text-home-categories-title text-esm md:text-xxl font-normal top-4 sm:top-auto font-glaho text-center'>
                            New Arrivals
                        </p>
                        <div
                            className='absolute bg-home-categories-blur-bg border-[1px] border-solid border-home-categories-blur-border left-1 bottom-1 xl:left-3 xl:bottom-3 '
                            style={{backdropFilter: 'blur(13.89px)'}}>
                            <div className='xl:ml-4 xl:mr-4 xl:mt-4 xl:mb-4 xl:pr-8'>
                                <p className='font-glaho font-normal text-home-categories-text text-xs'>New Arrivals</p>
                                <p className='font-glaho font-normal text-home-categories-text text-[8px]'>PRICE 20%
                                    OFF</p>
                                <p className='font-glaho font-normal text-home-categories-text text-[10px] mt-2'>DISCOUNT
                                    CODE - VATR3920</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div onClick={() => navigate('/allproduct')}>
                    <div className='relative flex items-center justify-center cursor-pointer mt-4 xl:mt-0'>
                        <img src={excItems} alt='img'/>
                        <p className='absolute text-home-categories-title text-esm md:text-xxl font-normal top-4 sm:top-auto font-glaho text-center'>
                            Exclusive Items
                        </p>
                        <div
                            className='absolute bg-home-categories-blur-bg border-[1px] border-solid border-home-categories-blur-border left-1 bottom-1 xl:left-3 xl:bottom-3 '
                            style={{backdropFilter: 'blur(13.89px)'}}>
                            <div className='xl:ml-4 xl:mr-4 xl:mt-4 xl:mb-4 xl:pr-8'>
                                <p className='font-glaho font-normal text-home-categories-text text-xs'>Exclusive
                                    Items</p>
                                <p className='font-glaho font-normal text-home-categories-text text-[8px]'>PRICE 20%
                                    OFF</p>
                                <p className='font-glaho font-normal text-home-categories-text text-[10px] mt-2'>DISCOUNT
                                    CODE - VATR3920</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default WeekHighlights;