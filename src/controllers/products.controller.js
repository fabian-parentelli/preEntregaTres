import * as productService from '../services/products.service.js';

const getAllProdducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, query = false, sort } = req.query;
        const result = await productService.getAllProducts(limit, page, query, sort);
        if (result.status === 'error') {
            res.sendClientError(result.error)
        } else {
            res.sendSuccess(result.payload);
        };
    } catch (error) {
        res.sendServerError(error.message);
    };
};

const getByIdProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        const result = await productService.getProductById(pid);
        if (result.status === 'error') {
            res.sendClientError(result.error)
        } else {
            res.sendSuccess(result.payload);
        };
    } catch (error) {
        res.sendServerError(error.message);
    };
};

const createProduct = async (req, res) => {
    try {
        const result = await productService.saveProducts({ ...req.body });
        if (result.status === 'error') {
            res.sendClientError(result.message)
        } else {
            res.sendSuccess(result.payload);
        };
    } catch (error) {
        res.sendServerError(error.message);
    };
};

const modifyProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        const result = await productService.modifyProducts(pid, { ...req.body });
        if (result.status === 'error') {
            res.sendClientError(result.error);
        } else {
            res.sendSuccess(result.payload);
        };
    } catch (error) {
        res.sendServerError(error.message);
    };
};

const deleteProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        const result = await productService.deleteProductsById(pid);
        if (result.status === 'error') {
            res.sendClientError(result.error)
        } else {
            res.sendSuccess(result.payload);
        };
    } catch (error) {
        res.sendServerError(error.message);
    };
};

export { getAllProdducts, getByIdProduct, createProduct, modifyProduct, deleteProduct };