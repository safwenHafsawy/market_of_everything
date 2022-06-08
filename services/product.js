"use strict";

const fs = require("fs");
const { Products } = require("../config/database_config").models;
const { deleteImages } = require("../lib/deleteImgs.js");

module.exports = class Product {
	/**
	 * -------------- CREATE A PRODUCT ----------------
	 */

	createProduct(productDetail, productImgs, productAuthor) {
		const {
			productTitle,
			productPrice,
			productCategory,
			productDesc,
			productRegion,
		} = productDetail;

		const product = new Products({
			title: productTitle,
			price: productPrice,
			categ: productCategory,
			desc: productDesc,
			region: productRegion,
			images: productImgs,
			pubDate: new Date().toLocaleString(),
			author: productAuthor,
		});

		return new Promise((resolve, reject) => {
			product
				.save()
				.then((record) => {
					resolve(record);
				})
				.catch((e) => reject(e));
		});
	}

	/**
	 * -------------- FETCH PRODUCTS ----------------
	 */

	getProducts(filter) {
		return new Promise((resole, reject) => {
			Products.find(filter)
				.then((data) => resole(data))
				.catch((error) => reject(error));
		});
	}

	/**
	 * -------------- SEARCH PRODUCTS ----------------
	 */

	async searchProduct(filters) {
		let results = [];
		const searchArr = filters.split("+");
		for (let i = 0; i < searchArr.length; i++) {
			const elePatt = new RegExp(searchArr[i], "i");
			const records = await Products.find({
				$or: [
					{ title: elePatt },
					{ categ: elePatt },
					{ desc: elePatt },
					{ region: elePatt },
				],
			});
			results.push(...records);
		}
		return results;
	}

	/**
	 * -------------- UPDATE PRODUCTS ----------------
	 */

	updateProduct(updateData) {
		//fetch products
		const { _id, prodData, images } = updateData;
		return new Promise((resolve, reject) => {
			Products.findById(_id)
				.then((record) => {
					let newImages = [...images];
					let toDeleteImages = [];
					//getting the updated image array
					if (prodData.old_images !== undefined)
						for (let image of record.images) {
							if (prodData.old_images.indexOf(image) !== -1) {
								newImages.push(image);
							} else {
								toDeleteImages.push(image);
							}
						}
					else toDeleteImages = [...record.images];

					const updatedFields = {
						title: prodData.productTitle,
						price: prodData.productPrice,
						categ: prodData.productCategory,
						region: prodData.productRegion,
						desc: prodData.productDesc,
						images: [...newImages],
					};

					Products.updateOne({ _id: record._id }, updatedFields)
						.then(() => {
							deleteImages(toDeleteImages)
								.then(() => {
									resolve(true);
								})
								.catch(() => reject(false));
						})
						.catch((e) => reject(e));
				})
				.catch((e) => reject(e));
		});
	}
	/**
	 * -------------- DELETE PRODUTCS ----------------
	 */

	deleteProduct(record_id) {
		return new Promise((resolve, reject) => {
			Products.findOneAndDelete({ _id: record_id })
				.then((record) =>
					deleteImages(record.images)
						.then(() => resolve(true))
						.catch(() => reject(false))
				)
				.catch(() => reject(false));
		});
	}
};
