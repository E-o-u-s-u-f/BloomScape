import express from 'express';
import { getLoginUser} from './login.js';
const route = express.Router();
import isLogin from '../middleware/islogin.js';

route.get('/login',isLogin ,getLoginUser);

export default route;