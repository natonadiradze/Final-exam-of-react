import React, {useState} from 'react';
import Countdown from 'react-countdown';

const CountDown = () => {
    const [isTime, setIsTime] = useState(true)


    const formatNumber = (number, isDay = false) => {
        if (isDay) {
            return number;
        } else {
            return number < 10 ? `0${number}` : number;
        }
    };

    const renderer = ({days, hours, minutes, seconds, completed}) => {
        if (completed) {
            setIsTime(false)
        } else {
            if (isTime) {
                return (
                    <div className='relative '>
                        <div className='absolute inset-0 bg-[#B1B1B1] blur-[9.5px]'></div>
                        <div className='flex space-x-2 justify-center relative z-[1] lg:px-4'>
                            <div className='flex flex-col  justify-center'>
                                <p className='text-center  text-black font-glaho font-normal  lg:text-md'>{formatNumber(days, true)}</p>
                                <span className='text-sm'>Days</span>
                            </div>
                            <span>:</span>
                            <div className='flex flex-col items-center justify-center'>
                                <p className='ttext-center  text-black font-glaho font-normal  lg:text-md'>{formatNumber(hours)}</p>
                                <span className='text-sm'>Hours</span>
                            </div>
                            <span>:</span>
                            <div className='flex flex-col items-center justify-center'>
                                <p className='text-center  text-black font-glaho font-normal  lg:text-md'>{formatNumber(minutes)}</p>
                                <span className='text-sm'>Minutes</span>
                            </div>
                            <span>:</span>
                            <div className='flex flex-col items-center justify-center'>
                                <p className='text-center  text-black font-glaho font-normal  lg:text-md'>{formatNumber(seconds)}</p>
                                <span className='text-sm'>Seconds</span>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    };

    const targetDate = Date.now() + 7 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000 + 4 * 60 * 1000 + 5 * 1000

    return (
        <>
            <Countdown
                renderer={renderer}
                date={targetDate}
            />
        </>
    );
};

export default CountDown;