const sharp = require("sharp");
const path = require("path");
const { PORT } = require("../config/main_configs.js");
const IMAGESPATHS = path.join(__dirname, "../public/imgs/");

async function resizeImage(req, res, next) {
	const Buffers = [];
	let filesName = [];
	const url = `https://marketofeveyrthing.herokuapp.com/`; //to be changed to `http://localhost:${PORT}/` in development
	res.locals.forEach((ele) => {
		Buffers.push(ele[1]);
		filesName.push(ele[0].split(" ").join("_"));
	});

	try {
		for (let indx in Buffers) {
			await sharp(Buffers[indx])
				.resize(1500, 1000, { fit: "contain", background: "#fffffe" })
				.toFile(path.join(IMAGESPATHS, filesName[indx]))
				.then(() => {
					const filePathArr = filesName.map((ele) => url + "images/" + ele);
					res.locals = filePathArr;
				});
		}

		next();
	} catch (err) {
		next(err);
	}
}

module.exports = { resizeImage };
