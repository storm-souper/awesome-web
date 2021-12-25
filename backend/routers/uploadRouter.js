import express from 'express';
import multer from 'multer';
import { isAuth } from "../utils.js";

const storage = multer.diskStorage({
  destination(req, file, cb){
    cb(null, 'uploads/');
  },
  filename(req, file, cb){
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({storage});
const uploadRouter = express.Router();

uploadRouter.post(
  '/',
  isAuth,
  upload.single('image'),
  (req, res) => {
    res.status(201).send(`/${req.file.path}`);
  },
);

export default uploadRouter;