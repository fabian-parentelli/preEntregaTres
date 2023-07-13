import * as productService from '../services/products.service.js';
import * as cartService from '../services/carts.service.js';

const chatVew = async (req, res) => {
    res.render('chat');
};

const login = async (req, res) => {
    res.render('login');
};

const index = async (req, res) => {
    res.render('login');
};

const register = async (req, res) => {
    res.render('register');
};

const products = async (req, res) => {

    const { limit = 10, page = 1, query = false, sort } = req.query;

    if (sort) {
        if (sort !== 'desc' && sort !== 'asc') {
            return res.render('products', { status: 'error', error: 'This sort no exist' });
        };
    };

    try {
        const preProducts = await productService.getAllProducts(limit, page, query, sort);
        const products = preProducts.payload;

        if (page > products.totalPages || page <= 0) {
            return res.render('products', { status: 'error', error: 'This page no exist' });
        };

        const url = '/products?'
        products.prevLink = products.hasPrevPage ? `${url}page=${products.prevPage}` : null;
        products.nextLink = products.hasNextPage ? `${url}page=${products.nextPage}` : null;

        res.render('products', {
            products: products.docs,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.prevLink,
            nextLink: products.nextLink
        });

    } catch (error) {
        res.render('products', { status: 'error', error });
    };
};

const cart = async (req, res) => {
    const { cid } = req.params;
    try {
        const result = await cartService.getByIdCarts(cid);
        console.log(result);
        res.render('carts', {result});
    } catch (error) {
        res.render('carts', { error: 'Error', error });
    };
};

export { chatVew, login, index, register, products, cart };