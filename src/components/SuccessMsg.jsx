import React from 'react';

const SuccessMsg = ({msg, setIsProductAdded}) => {
    return (
        <div
            className='flex items-center justify-between font-poppins w-[330px] h-[60px] fixed right-[10px] top-[20px] lg:right-[60px] lg:top-[60px] left-0 md:left-auto mx-auto rounded-sm bg-[#445F79] shadow-lg p-6 z-10'>
            <p className='pl-4 text-white'>{msg}</p>
            <svg onClick={() => setIsProductAdded(false)} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg"
                 width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                    d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                    fill="#fff"/>
            </svg>
        </div>
    );
};

export default SuccessMsg;