import * as cartService from '../services/carts.service.js';

const createCart = async (req, res) => {
    try {
        const result = await cartService.saveCart();
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    };
};

const getByIdCart = async (req, res) => {
    const { cid } = req.params;
    try {
        const result = await cartService.getByIdCarts(cid);
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    };
};

const productToCart = async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    try {
        const result = await cartService.addProductToCarts(cid, pid);
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    };
};

const removeProduct = async (req, res) => {
    const { cid } = req.params;
    const { pid } = req.params;
    try {
        const result = await cartService.deleteProduct(cid, pid);
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    };
};

const modifyCart = async (req, res) => {
    const { cid } = req.params;
    const product = req.body;
    try {
        const result = await cartService.updateProduct(cid, product);
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    };
};

const modifyQuantity = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const result = await cartService.updateQuantity(cid, pid, quantity);
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    };
};

const eliminateAllProducts = async (req, res) => {
    const { cid } = req.params;
    try {
        const result = await cartService.deleteAllProducts(cid);
        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    };
};

export { createCart, getByIdCart, productToCart, removeProduct, modifyCart, modifyQuantity, eliminateAllProducts };