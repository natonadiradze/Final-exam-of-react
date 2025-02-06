import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import ProductCard from '../components/ProductCard.jsx';
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Loader from '../components/Loader.jsx';
import 'react-range-slider-input/dist/style.css';
import FilterContainer from "../components/FilterContainer.jsx";

const Favorite = () => {
    const [value, setValue] = useState([0, 200]);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const itemsPerPage = 6;

    const favorites = useSelector((state) => state.favorite.favorite);
    const isLoading = useSelector((state) => state.favorite.isLoading);

    const pageCount = Math.ceil(favorites.length / itemsPerPage);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const handleCategoryChange = (category) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category];

        setSelectedCategories(updatedCategories);
    };

    const displayedFavorites = favorites
        .filter(
            (product) =>
                selectedCategories.length === 0 ||
                selectedCategories.includes(product.category)
        )
        .filter(
            (product) =>
                product.price >= value[0] && product.price <= value[1]
        )
        .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <>
            <div className='min-h-screen w-full'>
                <div className='container mx-auto flex flex-col justify-between sm:space-x-64 mt-16 mb-16 md:flex-row'>
                    <FilterContainer
                        value={value}
                        setValue={setValue}
                        selectedCategories={selectedCategories}
                        handleCategoryChange={handleCategoryChange}
                    />
                    <div
                        className='flex flex-wrap lg:min-w-[550px] xl:min-w-[750px] space-x-4 justify-center sm:justify-start'>
                        {isLoading ? (
                            <Loader/>
                        ) : displayedFavorites.length > 0 ? (
                            displayedFavorites.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    id={product.id}
                                    category={product.category}
                                />
                            ))
                        ) : (
                            <div className='container mx-auto min-h-[600px] mt-12'>
                                <div
                                    className='p-6 flex justify-center text-center flex-col items-center max-w-[600px] min-h-[250px] mx-auto bg-white rounded-md shadow-md'>
                                    <p className='text-[#445F79] font-poppins text-xl'>There are no products matching
                                        your criteria</p>
                                    <Link to={'/allproduct'}>
                                        <button
                                            className='border border-solid border-[#3E5673] px-12 mt-4 transition-all duration-500 py-1 rounded-sm flex items-center text-normal text-[#3E5673] text-md hover:text-white hover:bg-modal-btn'>
                                            Go To Products
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='container mt-12 mx-auto flex justify-center sm:justify-end mb-20'>
                    <ReactPaginate
                        previousLabel={
                            <div
                                className='flex justify-center items-center w-[24px] h-[24px] border border-solid border-[#DFE3E8] rounded-sm rotate-180'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'
                                     fill='none'>
                                    <path
                                        d='M7.83997 7.41L12.42 12L7.83997 16.59L9.24997 18L15.25 12L9.24997 6L7.83997 7.41Z'
                                        fill='#C4CDD5'/>
                                </svg>
                            </div>
                        }
                        nextLabel={
                            <div
                                className='flex justify-center items-center w-[24px] h-[24px] border border-solid border-[#DFE3E8] rounded-sm'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'
                                     fill='none'>
                                    <path
                                        d='M7.83997 7.41L12.42 12L7.83997 16.59L9.24997 18L15.25 12L9.24997 6L7.83997 7.41Z'
                                        fill='#C4CDD5'/>
                                </svg>
                            </div>
                        }
                        breakLabel={'...'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination flex space-x-3 text-black'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        </>
    );
};

export default Favorite;
