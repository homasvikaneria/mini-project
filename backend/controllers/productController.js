// nodejs_react/e-commerse-mini-project/backend/controllers/productController.js
const fs = require('fs');
const path = require('path');

const productPath = path.join(__dirname, '../models/Product.json');

// GET all products
const getProducts = (req, res) => {
    const products = JSON.parse(fs.readFileSync(productPath, 'utf-8'));
    res.status(200).json(products);
};

// ADD product
const addProduct = (req, res) => {
    const { id, name, price } = req.body;

    if (!id || !name || !price) {
        return res.status(400).json({ message: "Fill all fields" });
    }

    const products = JSON.parse(fs.readFileSync(productPath, 'utf-8'));

    products.push(req.body);
    fs.writeFileSync(productPath, JSON.stringify(products, null, 2));

    res.status(201).json({
        message: "Product added",
        data: req.body
    });
};

// UPDATE product
const updateProduct = (req, res) => {
    const { id } = req.params;
    const products = JSON.parse(fs.readFileSync(productPath, 'utf-8'));

    const index = products.findIndex(p => p.id == id);
    if (index === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    products[index] = { ...products[index], ...req.body };
    fs.writeFileSync(productPath, JSON.stringify(products, null, 2));

    res.status(200).json({
        message: "Product updated",
        data: products[index]
    });
};

// DELETE product
const deleteProduct = (req, res) => {
    const { id } = req.params;
    let products = JSON.parse(fs.readFileSync(productPath, 'utf-8'));

    const filtered = products.filter(p => p.id != id);
    if (filtered.length === products.length) {
        return res.status(404).json({ message: "Product not found" });
    }

    fs.writeFileSync(productPath, JSON.stringify(filtered, null, 2));

    res.status(200).json({ message: "Product deleted" });
};

module.exports = {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
};
