import express from 'express';
const route = express.Router();
import { sendMassage,getMassage } from './massageoutcontroller.js';
import isLogin from '../middleware/islogin.js';
route.post('/send/:id',isLogin, sendMassage)
route.get('/:id',isLogin,getMassage)

export default route;
