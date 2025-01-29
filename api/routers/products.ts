import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import {Product} from "../models/Product";

export const productsRouter = express.Router();

productsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    const expressReq = req as RequestWithUser;
    const user = expressReq.user;

    try {
        if (!user) {
            res.status(401).send({error: 'User not found!'});
            return;
        }

        const product = new Product({
            title: expressReq.body.title,
            seller: user._id,
            description: expressReq.body.description,
            price: expressReq.body.price,
            category: expressReq.body.category,
            image: req.file ? 'images' + req.file.filename : null,
        });

        await product.save();
        res.send(product);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
        }
        next(error);
    }
});

productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await Product.find().populate('seller', 'displayname');
        res.send(products);
    } catch (e) {
        next(e);
    }
});

productsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
        res.status(404).send('Not Found');
        return;
    }

    try {
        const product = await Product.findById(id).populate('seller', 'displayname');

        if (!product) {
            res.status(404).send('Not Found');
            return;
        }

        res.send(product);
    } catch (e) {
        next(e);
    }
});

productsRouter.delete('/:id', auth, async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
        res.status(404).send('Not Found');
        return;
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            res.status(404).send('Products Found');
            return;
        }

        res.send('Products was deleted successfully');
    } catch (e) {
        next(e);
    }
});

export default productsRouter;