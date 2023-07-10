import Router from './router.js';
import * as  cartController  from '../controllers/carts.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class CartsRouter extends Router {
    init() {
        this.post('/', ['PUBLIC'], passportEnum.NOTHING, cartController.createCart);
        this.get('/:pid', ['PUBLIC'], passportEnum.NOTHING, cartController.getByIdCart);
        this.post('/:cid/products/:pid', ['PUBLIC'], passportEnum.NOTHING, cartController.productToCart);
        this.delete('/:cid/products/:pid', ['PUBLIC'], passportEnum.NOTHING, cartController.removeProduct);
        this.put('/:cid', ['PUBLIC'], passportEnum.NOTHING, cartController.modifyCart);
        this.put('/:cid/products/:pid', ['PUBLIC'], passportEnum.NOTHING, cartController.modifyQuantity);
        this.delete('/:cid', ['PUBLIC'], passportEnum.NOTHING, cartController.eliminateAllProducts)
    };
};