"use strict";

const ProductService = require("../services/product");
const product = new ProductService();

/**
 * -------------- Fetch Products ----------------
 */
const fetchProducts = (req, res) => {
	const { categ } = req.query;
	product
		.getProducts({ categ })
		.then((data) => res.json({ status: 200, products: data }))
		.catch((e) => res.json({ error: e, message: "Could not fetch records" }));
};

/**
 * -------------- Create Products ----------------
 */
const createProd = (req, res, next) => {
	const author = req.session.passport.user;
	const images = res.locals; //getting the resized images
	const ProdData = JSON.parse(JSON.stringify(req.body)); //used to fix the null prototype issue
	console.log(author);
	product
		.createProduct(ProdData, images, author)
		.then((product) => {
			return res.json({ status: 201, message: "record created !", product });
		})
		.catch((e) => {
			res.json({
				status: 500,
				message: "record could not be created !",
				error: e,
			});
		});
};

/**
 * -------------- Search Products ----------------
 */

const searchProduct = async (req, res) => {
	const filters = req.query.q;
	const products = await product.searchProduct(filters);
	res.json({ status: 200, products: products });
};

/**
 * -------------- Update Products ----------------
 */
const updateProduct = (req, res) => {
	const { _id } = req.params;
	const images = res.locals; //getting the resized images
	const prodData = JSON.parse(JSON.stringify(req.body)); //used to fix the null prototype issue
	product
		.updateProduct({ _id, prodData, images })
		.then(() => res.json({ status: 201, message: "Your product was updated successfully  !" }))
		.catch((error) =>
			res.json({ status: 500, message: "Your product could not be updated ! Please try again" })
		);
};

/**
 * -------------- Delete Products ----------------
 */
const deleteProduct = async (req, res) => {
	const { _id } = req.params;
	try {
		const deleted = await product.deleteProduct(_id);
		if (deleted)
			return res.json({ status: 201, message: "Your product was deleted successfully !" });
	} catch (e) {
		res.json({ status : 500,  message: "Your record could not be deleted ! Please try again" });
	}
};

/**
 * -------------- Fetch User Products ----------------
 */

const fetchUserProducts = (req, res) => {
	const { id } = req.query;

	product
		.getProducts({ author: id })
		.then((records) => res.json({ status: 200, records }))
		.catch((e) => res.json({ e, m: "could not fetch records" }));
};

module.exports = {
	createProd,
	fetchProducts,
	updateProduct,
	deleteProduct,
	searchProduct,
	fetchUserProducts,
};
