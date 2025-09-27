import express from "express"
import { createShop, getMyShop } from "../controllers/shop.controllers.js";
import isAuth from "../middleware/isAuth.js"
import { upload } from '../middleware/multer.js'

const shopRouter = express.Router();
shopRouter.post('/create-edit', isAuth, upload.single("image"), createShop);         
shopRouter.get('/get-my-shop', isAuth, getMyShop);                                    

export default shopRouter


//Here 'isAuth' is used to verify the token which is stored in cookie of browser(Chrome) and if it is verified then only
// user can create or edit the shop. otherwise not.
//And 'isAuth' will add userId in req object (req.userId) which we can use in controllers/shop.controllers.js file.
//And 'upload.single("image")' is used to upload image on cloudinary.

//Here., 'upload.single("image")' is used to send image from backend(in which image come from frontend) to multer.js and multer
// save that image in './public'(folder in backend)    and.,   after this 'createShop(controllers/shop.controllers.js)' is called
// then., with the help of this line (uploadOnCloudinary(req.file.path))., utils -> cloudinary.js will be called. and finally image 
// will be uploaded on cloudinary and we will get the image url which we will save in database. 

