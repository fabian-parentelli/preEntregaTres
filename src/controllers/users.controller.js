import * as userService from '../services/users.service.js';

const registerUser = async (req, res) => {
    try {
        const result = await userService.saveUser({ ...req.body });
        if (result.status === 'error') {
            res.sendClientError(result.error)
        } else {
            res.sendSuccess(result.payload);
        };
    } catch (error) {
        res.sendServerError(error.message);
    };
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await userService.loginUser(email, password);
        if (result.status === 'error') {
            res.sendClientError(result.error)
        } else {
            res.sendSuccess(result);
        };
    } catch (error) {
        res.sendServerError(error.message);
    };
};

const current = async (req, res) => {
    const { user } = req.user;
    res.sendSuccess(user);
};

export { registerUser, loginUser, current };