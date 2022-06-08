"use-strict";

const fs = require("fs");
const path = require("path");

function deleteImages(images) {
	return new Promise((resolve, reject) => {
		if (images.length === 0) resolve();
		images.forEach((ele) => {
			const imageName = ele.split("/")[4];
			const imagePath = path.join(__dirname, "../public/imgs", imageName);
			fs.unlink(imagePath, function (err) {
				if (err) reject();
				resolve();
			});
		});
	});
}

module.exports = { deleteImages };
