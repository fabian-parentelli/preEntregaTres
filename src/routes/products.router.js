import Router from './router.js';
import * as productsController from '../controllers/products.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class ProductRouter extends Router {

    init() {
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, productsController.getAllProdducts);
        this.get('/:pid', ['PUBLIC'], passportEnum.NOTHING, productsController.getByIdProduct);
        this.post('/', ['ADMIN'], passportEnum.JWT, productsController.createProduct);
        this.put('/:pid', ['ADMIN'], passportEnum.JWT, productsController.modifyProduct);
        this.delete('/:pid', ['ADMIN'], passportEnum.JWT, productsController.deleteProduct);
    };
};