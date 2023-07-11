import Router from "./router.js";
import * as userController from '../controllers/users.controller.js';
import { passportEnum } from "../config/enums.config.js";

export default class UsersRouter extends Router {
    init() {
        this.post('/login', ['PUBLIC'], passportEnum.NOTHING, userController.loginUser);
        this.post('/register', ['PUBLIC'], passportEnum.NOTHING, userController.registerUser);
        this.get('/current', ['PUBLIC'], passportEnum.JWT, userController.current);
    };
};