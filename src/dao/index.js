import { Cart } from './dbConfig.js';
import { Product } from './dbConfig.js';
import { User } from './dbConfig.js';
import { Chat } from './dbConfig.js';

const cartsDao = new Cart();
const producstDao = new Product();
const userDao = new User();
const chatDao = new Chat();

export const CARTS_DAO = cartsDao;
export const PRODUCTS_DAO = producstDao;
export const USER_DAO = userDao;
export const CHAT_DAO = chatDao; 