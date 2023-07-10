import UserRepository from "../repsitories/users.repository.js";
import CartRepository from '../repsitories/carts.repository.js'; 
import { isValidPassword, generateToken, createHash } from '../utils.js';

const userManager = new UserRepository();
const cartManager = new CartRepository();

const saveUser = async (user) => {
    const { first_name, last_name, age, role, email, password } = user;

    if (!first_name || !last_name || !role || !email || !password || !age) {
        return { status: 'error', error: 'Incomplete value' };
    };

    try {
        const exists = await userManager.getByEmail(email);
        if (exists) return { status: 'error', error: 'User already exists' };

        const hashedPassword = createHash(password);
        const newUser = { ...user };

        const addCart = await cartManager.save();
        newUser.cart = addCart._id;

        newUser.password = hashedPassword;

        const result = await userManager.save(newUser);

        return { status: 'success', payload:result };
    } catch (error) {
        console.error(error);
    };
};

const loginUser = async (email, password) => {
    const user = await userManager.getByEmail(email);
    if (!user) return { status: 'error', error: 'Incorrect credentoals' };

    const comparePassword = isValidPassword(user, password);
    if (!comparePassword) return { status: 'error', error: 'Incorrect credentials' };

    delete user.password;
    const accesToken = generateToken(user);
    return { accesToken };
};
export { saveUser, loginUser };