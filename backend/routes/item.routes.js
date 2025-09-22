import express from "express"
import { createShop } from "../controllers/shop.controllers.js";
import isAuth from "../middleware/isAuth.js";
import { addItem, editItem } from "../controllers/item.controllers.js";
import { upload } from '../middleware/multer.js'

const itemRouter = express.Router();

itemRouter.post('/add-item', isAuth, upload.single("image"), addItem);
itemRouter.post('/edit-item/:itemId', isAuth, upload.single("image"), editItem);

export default itemRouter

