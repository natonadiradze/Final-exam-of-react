import React from 'react';
import notFoundSvg from '../assets/svg/page-not-found.svg'
import {Link} from "react-router-dom";

const NotFound = () => {

    return (
        <div className='w-full flex flex-col justify-start items-center max-h-screen'>
            <img src={notFoundSvg} alt='not found svg' className='w-[500px] h-[400px]'/>
            <div className='mb-40 -mt-20 md:-mt-8'>
                <Link to={'/'}>
                    <button
                        className='border border-solid border-[#3E5673] px-12 transition-all duration-500 py-1 rounded-sm flex items-center text-normal text-[#3E5673] text-md hover:text-white hover:bg-modal-btn'>
                        Back to Home Page
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;