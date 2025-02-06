import React from 'react';
import {Rings} from 'react-loader-spinner'

const Loader = () => {
    return (
        <div className='w-full h-[600px] flex justify-center items-center'>
            <Rings
                visible={true}
                height="100"
                width="100"
                color="#445F79"
                ariaLabel="rings-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default Loader;
