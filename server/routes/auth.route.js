import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const route = express.Router();

route.post("/user-signup", signup);

export default route;