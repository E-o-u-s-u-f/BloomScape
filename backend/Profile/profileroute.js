import express from 'express';
import isLogin from '../middleware/islogin.js';
import { getProfile, editProfile } from './profilecontrol.js';

const router = express.Router();

// Route to get user profile
router.get('/profile', isLogin, getProfile);

// Route to edit user profile
router.put('/profile', isLogin, editProfile);

export default router;