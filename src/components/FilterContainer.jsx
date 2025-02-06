import React from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const FilterContainer = ({value, setValue, selectedCategories, handleCategoryChange}) => {
    return (
        <div className='min-h-[300px] min-w-[250px] bg-sort-table md:min-h-[600px]'>
            <div className='pt-4 pl-4 pr-4'>
                <p className='font-glaho text-sm font-normal text-sort-table-dark'>PRICES</p>
                {value.length > 0 ? (
                    <div className='flex justify-between items-center mt-4'>
                        <p className='text-sort-table-light font-normal font-glaho text-esm'>Range</p>
                        <p className='text-edark font-glaho font-normal text-esm'>${value[0]} - ${value[1]}</p>
                    </div>
                ) : (
                    <></>
                )}

                <div className='range-container mt-4'>
                    <RangeSlider min={0} max={800} value={value} onInput={setValue}/>
                </div>

                <h4 className='text-esm font-glaho font-normal text-edark mt-10'>Categories</h4>

                <div className='w-full mt-6'>
                    {['electronics', 'jewelery', "men's clothing", "women's clothing"].map((category) => (
                        <div key={category} className='flex space-x-2'>
                            <input
                                type='checkbox'
                                onChange={() => handleCategoryChange(category)}
                                checked={selectedCategories.includes(category)}
                            />
                            <label>{category}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterContainer;