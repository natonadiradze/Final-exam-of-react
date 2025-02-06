import React, {useEffect, useState} from 'react';
import {fetchCategories} from "../utils/api.js";
import car1 from '../assets/images/carousel1.png';
import car2 from '../assets/images/carousel2.png';
import car3 from '../assets/images/carousel3.png';
import {Link} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';


const imageArray = [car1, car3, car2, car3, car2, car1];

const CarouselComp = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const categoriesData = await fetchCategories();
            setCategories(categoriesData.concat(['kids', 'sport']));
        };

        fetchData();
    }, []);

    return (
        <div className='mt-16 relative'>
            {
                categories.length > 0 ?
                    <h2 className='font-normal text-main-text text-xl sm:text-3xl text-center leading-normal'>Categories</h2> : <></>
            }

            <Swiper
                style={{zIndex: 1}}
                spaceBetween={30}
                navigation
                autoplay={{delay: 3000}}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                breakpoints={{
                    764: {
                        slidesPerView: 2,
                    },
                    1200: {
                        slidesPerView: 4,
                    },
                }}
            >
                {categories.map((category, index) => (
                    <SwiperSlide key={index}>
                        <div className='flex flex-col items-center'>
                            <Link to={`/category/${category}`}>
                                <img src={imageArray[index]} alt={`Category ${index + 1}`}/>
                            </Link>
                            <Link to={`/category/${category}`}>
                                <p className='font-poppins font-medium text-black text-md md:text-lg'>{category}</p>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>

        </div>

    );
};

export default CarouselComp;
