"use strict";

const { checkAuthentication } = require("../middlewares/authenticate");
const { uploadImagesFn } = require("../middlewares/mutler");
const { resizeImage } = require("../middlewares/sharp");
const {
	createProd,
	fetchProducts,
	updateProduct,
	deleteProduct,
	searchProduct,
	fetchUserProducts,
} = require("../controllers/productCnt");

module.exports = function (app) {
	app
		.route("/api/products")
		.get(fetchProducts)
		.post(checkAuthentication, uploadImagesFn, resizeImage, createProd);

	app.route("/api/products/search").get(searchProduct);

	app.route("/api/products/:_id").put(uploadImagesFn, resizeImage ,updateProduct).delete(deleteProduct);

	app.route("/api/getuserproducts").get(fetchUserProducts);
};
