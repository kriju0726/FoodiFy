import express from "express"
import { createShop } from "../controllers/shop.controllers.js";
import isAuth from "../middleware/isAuth.js";
import { addItem, deleteItem, editItem, getItemById } from "../controllers/item.controllers.js";
import { upload } from '../middleware/multer.js'

const itemRouter = express.Router();

itemRouter.post('/add-item', isAuth, upload.single("image"), addItem);
itemRouter.post('/edit-item/:itemId', isAuth, upload.single("image"), editItem);
itemRouter.get('/get-by-id/:itemId', isAuth, getItemById);
itemRouter.get('/delete/:itemId', isAuth, deleteItem);
export default itemRouter

