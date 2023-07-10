import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import passport from 'passport';
import { __dirname } from './utils.js';
import initializePassport from './config/passport.config.js';
import UsersRouter from './routes/users.router.js';
import CartsRouter from './routes/carts.router.js';
import ProductRouter from './routes/products.router.js';
import ChatRouter from './routes/chats.router.js';
import VewsRouter from './routes/vews.router.js';
import * as chatService from './services/chats.service.js';

const usersRouter = new UsersRouter();
const productsRouter = new ProductRouter();
const cartsRouter = new CartsRouter();
const chatRouter = new ChatRouter();
const vewsRouter = new VewsRouter();

const app = express();

initializePassport();
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter.getRouter());
app.use('/api/carts', cartsRouter.getRouter());
app.use('/', vewsRouter.getRouter());
app.use('/api/users', usersRouter.getRouter());
app.use('/api/chats', chatRouter.getRouter());

const server = app.listen(8080, () => console.log('Server runing in port 8080'));

const io = new Server(server);
app.set('socketio', io);

io.on('connection', socket => {
    socket.on('newUser', async ({ user }) => {
        socket.broadcast.emit('newUserConnected', { user: user });
        const messages = await chatService.getMessage();
        io.emit('messageLogs', messages);
    });
});