import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {getProductsByCategory} from '../utils/api.js';
import ProductCard from '../components/ProductCard.jsx';
import 'react-range-slider-input/dist/style.css';
import ReactPaginate from 'react-paginate';
import Loader from '../components/Loader.jsx';
import priceFilter from '../assets/images/filtering.png';
import priceHighToLow from '../assets/images/filter.png';
import FilterContainer from "../components/FilterContainer.jsx";

const Products = () => {
    const {categoryName} = useParams();
    const [products, setProducts] = useState([]);
    const [value, setValue] = useState([0, 200]);
    const [loading, setLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    const handleSortClick = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleCategoryChange = (category) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((item) => item !== category)
            : [...selectedCategories, category];
        setSelectedCategories(updatedCategories);
    };

    const filterProductsByCategories = () => {
        if (selectedCategories.length > 0) {
            return products.filter((product) =>
                selectedCategories.includes(product.category)
            );
        }
        return products;
    };

    const filteredProductsByCategories = filterProductsByCategories();

    const filterProductsByPrice = () => {
        const filteredProducts = products.filter((product) => {
            const productPrice = parseFloat(product.price);
            const min = value[0] !== undefined ? parseFloat(value[0]) : Number.NEGATIVE_INFINITY;
            const max = value[1] !== undefined ? parseFloat(value[1]) : Number.POSITIVE_INFINITY;
            return productPrice >= min && productPrice <= max;
        });
        return filteredProducts;
    };

    const filteredProducts = filterProductsByPrice();

    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const displayedProducts = filteredProducts.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const getSortedProducts = () => {
        const sortedProducts = filteredProducts.sort((a, b) => {
            const firstPrice = parseFloat(a.price);
            const secondPrice = parseFloat(b.price);

            if (sortOrder === 'asc') {
                return firstPrice - secondPrice;
            } else {
                return secondPrice - firstPrice;
            }
        });

        return sortedProducts;
    };

    const sortedProducts = getSortedProducts();
    const offset = currentPage * itemsPerPage;
    const currentProducts = sortedProducts.slice(offset, offset + itemsPerPage);

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        setLoading(true);
        const fetchProducts = async () => {
            try {
                const requests = selectedCategories.map((category) =>
                    getProductsByCategory(category)
                );
                const responses = await Promise.all(requests);
                const mergedProducts = responses.reduce(
                    (merged, products) => [...merged, ...products],
                    []
                );
                setLoading(false);
                setProducts(mergedProducts);
            } catch (error) {
                console.error('Error while fetching products data:', error);
            }
        };
        fetchProducts();
    }, [categoryName, selectedCategories]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getProductsByCategory(categoryName);
                if (productsData) {
                    setLoading(false);
                    setProducts(productsData);
                }
            } catch (error) {
                console.error('Error while fetching products:', error);
            }
        };
        fetchProducts();
    }, [categoryName]);

    return (
        <div className='min-h-screen w-full'>
            {loading ? (
                <Loader/>
            ) : (
                <div className='container mx-auto flex flex-col justify-between sm:space-x-56 mt-16 mb-16 md:flex-row'>
                    <FilterContainer
                        value={value}
                        setValue={setValue}
                        selectedCategories={selectedCategories}
                        handleCategoryChange={handleCategoryChange}
                    />


                    <div
                        className='flex flex-wrap lg:min-w-[550px] xl:min-w-[750px] space-x-4 justify-center sm:justify-start'>
                        {displayedProducts.length === 0 ? (
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
                        ) : (
                            <div className='flex flex-col'>
                                <div className='flex items-center space-x-4 ml-4 lg:ml-0'>
                                    <p className='font-poppins text-md'>Price Filter</p>
                                    {
                                        sortOrder === 'asc' ? (
                                            <img onClick={handleSortClick} src={priceFilter} alt='filter price'
                                                 className='w-[30px] h-[30px] cursor-pointer'/>
                                        ) : (
                                            <img onClick={handleSortClick} src={priceHighToLow} alt='filter price'
                                                 className='w-[30px] h-[30px] cursor-pointer'/>
                                        )
                                    }
                                </div>
                                <div
                                    className='flex flex-wrap lg:min-w-[550px] xl:min-w-[750px] space-x-4 justify-center sm:justify-start'>
                                    {currentProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            id={product.id}
                                            category={product.category}
                                            title={product.title}
                                            imgUrl={product.image}
                                            price={product.price}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {pageCount > 1 && (
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
            )}
        </div>
    );
};

export default Products;
