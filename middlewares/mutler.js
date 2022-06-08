"use strict";

const multer = require("multer");

/* mutler configurations */
const multerStorage = multer.memoryStorage(); //store it in the memory to use with sharp(resize)
const uploadImages = multer({ storage: multerStorage }).array("images", 6);

//multer middelware
const uploadImagesFn = (req, res, next) => {
	console.log(req.user);
  const Buffers = [];
  uploadImages(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.json({err,  errr: "multer error !" });
    } else if (err) {
      res.json(err);
    }
    const {productTitle} = req.body;
    req.files.forEach((element, index) => {
			const timeStamp = Date.now();
      const orgName = element.originalname.split(".")[0];
      const extenstion = element.mimetype.split("/")[1];
      Buffers.push([timeStamp + "-" + orgName + "." + extenstion, element.buffer]);
    });
    res.locals = Buffers;
    next();
  });
};

module.exports = { uploadImagesFn };
