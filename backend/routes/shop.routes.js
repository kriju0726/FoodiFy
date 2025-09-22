import express from "express"
import { createShop, getMyShop } from "../controllers/shop.controllers.js";
import isAuth from "../middleware/isAuth.js"
import { upload } from '../middleware/multer.js'

const shopRouter = express.Router();
shopRouter.post('/create-edit', isAuth, upload.single("image"), createShop);
shopRouter.get('/get-my-shop', isAuth, getMyShop);

export default shopRouter

