import "./updateArticle.scss";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../loading/loading.js";

const UpdateProduct = () => {
	const loc = useLocation();
	const navigator = useNavigate();
	const { _id, title, price, categ, desc, region, images } = loc.state.item;
	const [title_u, setTitle_u] = useState(title);
	const [price_u, setPrice_u] = useState(price);
	const [desc_u, setDesc_u] = useState(desc);
	const [region_u, setRegion_u] = useState(region);
	const [categ_u, setCateg_u] = useState(categ);
	const [images_u, setImages_u] = useState([]);
	const [newImages, setNewImages] = useState([]);
	const [imgError, setImgError] = useState(false);
	const [info, setInfo] = useState("");
	const [inputBlankError, setInputBlankError] = useState(false);
	const [loading, setLoading] = useState(false);

	async function updateProduct() {
		if (images_u.length + newImages.length > 6) {
			setImgError(true);
			return;
		}
		setLoading(true);
		const formData = new FormData();

		formData.append("productTitle", title_u);
		formData.append("productPrice", price_u);
		formData.append("productCategory", categ_u);
		formData.append("productRegion", region_u);
		formData.append("productDesc", desc_u);
		images_u.forEach((ele) => formData.append("old_images", ele));
		newImages.forEach((ele) => formData.append("images", ele));

		for (let fild of formData) {
			if (fild[1] === "undefined" || fild[1] === "0" || fild[1] === "") {
				setInputBlankError(true);
				return;
			} else {
				setInputBlankError(false);
			}
		}

		if (imgError === false && inputBlankError === false) {
			const response = await fetch(`/api/products/${_id}`, {
				method: "PUT",
				credentials: "include",
				body: formData,
			});
			const { status, message } = await response.json();
			if (status === 201) {
				setLoading(false);
				setInfo(message);
			} else if (status === 500) {
				setLoading(false);
				setInfo(message);
			}
		}
	}
	const handleChange = (e) => {
		switch (e.target.name) {
			case "title":
				setTitle_u(e.target.value);
				break;
			case "price":
				setPrice_u(e.target.value);
				break;
			case "region":
				setRegion_u(e.target.value);
				break;
			case "categ":
				setCateg_u(e.target.value);
				break;
			case "desc":
				setDesc_u(e.target.value);
				break;
		}
	};

	/*--------- images manipulation ---------*/
	const removeImage = (e) => {
		const imageInd = parseInt(e.target.name);
		setImages_u((prevState) => {
			const newState = prevState.filter((ele, indx) => indx !== imageInd);
			return newState;
		});
	};

	useEffect(() => {
		setImages_u([...images]);
	}, []);

	const addImages = (e) => {
		setNewImages([...e.target.files]);
		setImgError(false);
	};

	if (info.length > 0) return <ShowInfo info={info} changeInfo={setInfo} />;
	else
		return (
			<>
			{loading ? <Loading message="updating your product" /> : ""}
			<div id="update-page">
				<h3>Update Your Product</h3>
				<hr />
				<div>
					<span>
						<label for="product-title">Product Title</label>
					</span>
					<input
						name="title"
						onChange={(e) => handleChange(e)}
						type="text"
						id="product-title"
						value={title_u}
					/>
				</div>
				<div>
					<span>
						<label for="product-price">Product Price</label>
					</span>
					<input
						name="price"
						onChange={(e) => handleChange(e)}
						type="text"
						id="product-price"
						value={price_u}
					/>
				</div>
				<div>
					<span>
						<label for="product-categ">Product Category</label>
					</span>
					<select
						name="categ"
						onChange={(e) => handleChange(e)}
						value={categ_u}
						id="product-categ"
					>
						<option value="--categ--" disabled>
							--choose a category--
						</option>
						<option value="Cars">Cars</option>
						<option value="Houses">Houses</option>
						<option value="Fashion">Fashion</option>
						<option value="Electronics">Electronics</option>
						<option value="Services">Services</option>
						<option value="Other">Other</option>
					</select>
				</div>
				<div>
					<span>
						<label for="product-region">Product Region</label>
					</span>
					<select
						name="region"
						onChange={(e) => handleChange(e)}
						value={region_u}
						id="product-region"
					>
						<option value="--region--" disabled>
							--choose a region--
						</option>
						<option value="Tunis">Tunis</option>
						<option value="Nabeul">Nabeul</option>
						<option value="Zaghwen">Zaghwen</option>
						<option value="Sidi Bouzid">Sidi Bouzid</option>
						<option value="Sfax">Sfax</option>
						<option value="Gabes">Gabes</option>
					</select>
				</div>
				<div>
					<span>
						<label for="product-desc">Product Description</label>
					</span>
					<textarea
						id="product-desc"
						cols="50"
						rows="10"
						name="desc"
						value={desc_u}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<hr />
				<span>
					<label>
						{images_u.length > 0
							? "Tap on image to remove it"
							: "Please add some images"}
					</label>
				</span>
				<div id="current-images">
					{images_u.map((ele, indx) => (
						<div>
							<img name={indx} src={ele} key={indx} onClick={removeImage} />
						</div>
					))}
					<br />
				</div>
				<hr />
				<div>
					<span for="new-image">
						<label>Add new image</label>
					</span>
					<input
						type="file"
						id="new-image"
						onChange={(e) => addImages(e)}
						multiple
					/>
				</div>
				<p id="error-p">{imgError ? "images cannot surpass 6" : ""}</p>
				<hr />
				<button onClick={updateProduct}> Update Product </button>
			</div>
			</>
		);
};

const ShowInfo = (props) => {
	const navigator = useNavigate();
	return (
		<div id="info-div">
			<div>
				<p>{props.info}</p>
				<button
					onClick={() => {
						props.changeInfo(false);
						navigator("/myProducts");
					}}
				>
					Okay i get it
				</button>
			</div>
		</div>
	);
};

export default UpdateProduct;
