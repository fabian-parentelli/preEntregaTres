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

export { chatVew, login, index, register };