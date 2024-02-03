const Product = require("../models/ProductModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, countInStock, price, rating, description } =
            newProduct;
        try {
            //check xem product đã tồn tại hay chưa
            const checkProduct = await Product.findOne({
                name: name,
            });
            if (checkProduct !== null) {
                resolve({
                    status: "OK",
                    message: "The name of product is exist",
                });
            }

            const createProduct = await Product.create({
                name,
                image,
                type,
                countInStock,
                price,
                rating,
                description,
            });
            if (createProduct) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createProduct,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check xem product đã tồn tại hay chưa
            const checkProduct = await Product.findOne({
                _id: id,
            });
            if (checkProduct === null) {
                resolve({
                    status: "OK",
                    message: "The product is not defined",
                });
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, {
                new: true,
            });
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedProduct,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            });
            if (checkProduct === null) {
                resolve({
                    status: "OK",
                    message: "The product is not defined",
                });
            }

            await Product.findByIdAndDelete(id);
            resolve({
                status: "OK",
                message: "Delete product success",
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id,
            });
            if (product === null) {
                resolve({
                    status: "OK",
                    message: "The product is not defined",
                });
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: product,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllProduct = (limit = 8, page = 0) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments();
            const allProduct = await Product.find()
                .limit(limit)
                .skip(page * limit);
            resolve({
                status: "OK",
                message: "get all product success",
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit),
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct,
};
