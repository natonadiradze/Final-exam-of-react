import React from 'react';
import mainImage from "../assets/images/home_main_img.png";
import logo from "../assets/images/hero-logo.png";
import {Link} from "react-router-dom";

const DiscoverCollection = () => {
    return (
        <div className='relative'>
            <img src={mainImage} alt='hero image' className='w-full h-[300px] md:h-[450px] lg:h-[650px]'/>
            <div className='bg-home-card max-w-[500px] ml-4 mr-4 sm:ml-auto sm:mr-auto lg:max-w-[630px] h-[280px] lg:h-[350px] absolute inset-0 mx-auto my-auto rounded-xxl'>
                <div>
                    <img src={logo} alt='logo' className='mx-auto'/>
                </div>

                <div>
                    <p className='text-center text-main-text font-poppins font-medium md:text-xxl'>Start The Day <br></br> With Closet.</p>
                </div>

                <div className='flex justify-center mt-4'>
                    <Link to={'/allproduct'}>
                        <button className='rounded-md bg-home-dark px-8 py-2 text-white font-roboto text-[20px] font-medium hover:text-white hover:bg-modal-btn'>Discovery our collection</button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default DiscoverCollection;