import ProductRepository from '../repsitories/products.repository.js';

const productManager = new ProductRepository();

const getAllProducts = async (limit, page, query, sort) => {
    if (sort) if (sort !== 'desc' && sort !== 'asc') return { status: 'error', error: 'This sort no exist' };
    try {
        let queryObj;
        if (!isNaN(query)) {
            queryObj = query ? { stock: { $lte: query } } : {};
        } else {
            queryObj = query ? { category: { $regex: query, $options: "i" } } : {};
        };

        let sortResult;
        if (sort === 'asc') {
            sortResult = { price: 1 };
        } else if (sort === 'desc') {
            sortResult = { price: -1 };
        } else {
            sortResult = {};
        };

        const products = await productManager.getAll(limit, page, queryObj, sortResult);
        if (page > products.totalPages || page <= 0) return { status: 'error', error: 'This page no exist' };
        const url = '/api/products?'
        products.prevLink = products.hasPrevPage ? `${url}page=${products.prevPage}` : null;
        products.nextLink = products.hasNextPage ? `${url}page=${products.nextPage}` : null;

        return products ? { status: 'sucsess', payload: products } : [];
    } catch (error) {
        console.error(error.message);
    };
};

const getProductById = async (id) => {
    try {
        const result = await productManager.getById(id);
        return { status: 'success', payload: result };
    } catch (error) {
        return { status: 'error', error: 'Product not found' };
    };
};

const saveProducts = async (product) => {
    const { title, description, code, price, stock, category } = product;

    if (!title || !description || !code || !price || !stock || !category) {
        return { status: 'error', message: 'Incomplete Value' };
    };
    try {
        const codeSearch = await productManager.getByCode(code);
        if (codeSearch.length) return { status: 'error', message: 'The code is repeted' };

        const result = await productManager.save(product);
        return { status: 'success', payload: result };
    } catch (error) {
        console.error(error);
    };
};

const modifyProducts = async (id, product) => {
    const { title, description, code, price, stock, category } = product;
    if (!title || !description || !code || !price || !stock || !category) {
        return { status: 'error', error: 'Incomplete Value' };
    };
    try {
        const result = await productManager.updateById(id, product);
        return { status: 'success', payload: result };
    } catch (error) {
        console.error(error);
    };
};

const deleteProductsById = async (id) => {
    try {
        const result = await productManager.deleteById(id);
        return { status: 'success', payload: result };
    } catch (error) {
        return { status: 'error', error: 'Product not found' };
    };
};

export { saveProducts, getAllProducts, getProductById, modifyProducts, deleteProductsById };