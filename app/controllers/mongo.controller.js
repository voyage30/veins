const Product = require('../models/mongo.model');
const api = require('../functions/helpers');

exports.create = function (req, res, next) {
    let product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    product.save(function (err) {
        if (err) {
            return api.respond(res, 500, false, err, product);
        }
        api.respond(res, 200, true, "Product Created Successfully", product);
    })
};

exports.read = function (req, res) {
    Product.find(function (err, products) {
        if (err) {
            return api.respond(res, 500, false, err);
        }
        api.respond(res, 200, true, "Products Read", products);
    })
};

exports.readOne = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) {
            return api.respond(res, 500, false, err);
        }
        api.respond(res, 200, true, "Product Read", product);
    })
};

exports.update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, product) {
        if (err) {
            return api.respond(res, 500, false, err);
        }
        api.respond(res, 200, true, "Product Updated", product);
    });
};

exports.delete = function (req, res) {
    Product.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            return api.respond(res, 500, false, err);
        }
        api.respond(res, 200, true, "Product Deleted successfully");
    })
};
