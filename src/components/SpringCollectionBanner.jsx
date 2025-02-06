import React from 'react';
import CountDown from "./CountDown.jsx";
import springImage from '../assets/images/spring_img.png'
import {Link} from "react-router-dom";

const SpringCollectionBanner = () => {
    return (
        <div className="flex justify-center bg-center bg-no-repeat mt-44 mr-2 ml-2 md:mr-0 md:ml-0 relative">
            <img src={springImage} alt={'img'} style={{flexShrink: 0}}/>
            <div
                className='text-[#3E5673] font-normal absolute right-1 top-1 sm:right-2 sm:top-2 lg:right-40 lg:top-16'>
                <p className='font-glaho text-sm sm:text-md lg:text-xl '>
                    SPRING <span
                    className='text-[#DE4F46] font-normal font-glaho text-sm sm:text-md lg:text-xl'>COLLECTIONS</span>
                </p>
                <Link to={'/allproduct'}>
                    <button className='bg-white px-4 py-1 flex items-center text-[#DE4F46] gap-[18px] mt-5 text-sm'>
                        SHOP NOW
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="6" viewBox="0 0 18 6" fill="none">
                            <path
                                d="M17.6652 3.44258C17.8008 3.30693 17.8008 3.087 17.6652 2.95135L15.4547 0.740797C15.319 0.605147 15.0991 0.605147 14.9634 0.740797C14.8278 0.876447 14.8278 1.09638 14.9634 1.23203L16.9283 3.19696L14.9634 5.16189C14.8278 5.29754 14.8278 5.51748 14.9634 5.65313C15.0991 5.78878 15.319 5.78878 15.4546 5.65313L17.6652 3.44258ZM0.746582 3.54431L17.4196 3.54432L17.4196 2.84961L0.746582 2.84961L0.746582 3.54431Z"
                                fill="#EB5757"/>
                        </svg>
                    </button>
                </Link>

            </div>

            <div className='absolute right-0 top-20 sm:right-4 sm:top-28 sm:px-4 lg:right-72 lg:top-56 '>
                <CountDown/>
            </div>

        </div>
    );
};

export default SpringCollectionBanner;