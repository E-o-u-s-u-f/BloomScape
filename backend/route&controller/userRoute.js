import express from 'express';
import { getUserBySearch ,getCurrentChatters} from './userroutecontroller.js';
const route = express.Router();
import isLogin from '../middleware/islogin.js';

route.get('/search',isLogin ,getUserBySearch);
route.get('/currentchatters',isLogin ,getCurrentChatters);

export default route;
