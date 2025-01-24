import express from 'express';
import { Register, Login, Logout } from '../Controllers/userController.js';

const router = express.Router();

// Register User
router.post('/register', Register);

// Login User
router.post('/login', Login);

// Logout User
router.get('/logout', Logout);


export default router;