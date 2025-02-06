import axios from "axios";

const apiUrl = import.meta.env.VITE_KEY;

export const loginUser = async (userData) => {
    const response = await axios.post(`${apiUrl}/auth/login`, userData);
    return response.data;
};

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${apiUrl}/products/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const getProductsByCategory = async (categoryName) => {
    try {
        const response = await axios.get(`${apiUrl}/products/category/${categoryName}`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching products:', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${apiUrl}/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching product by ID:', error);
        throw error;
    }
}

export const getAllProduct = async () => {
    try {
        const response = await axios.get(`${apiUrl}/products`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching products:', error);
        throw error;
    }
}