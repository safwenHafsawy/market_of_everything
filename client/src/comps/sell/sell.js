import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./sell.scss";
import { useSelector } from "react-redux";
import Loading from "../loading/loading.js";

function Sell(props) {
	const AUTH_USER = useSelector((state) => state.logInOutRed.username);
	const [images, setImages] = useState([]);
	const navigator = useNavigate();
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState(0);
	const [category, setCategory] = useState();
	const [region, setRegion] = useState();
	const [description, setDescription] = useState("");
	const [error, setError] = useState(false);
	const [inputBlankError, setInputBlankError] = useState(false);
	const [loading, setLoading] = useState(false);

	//submit post

	const submitPost = async (e) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData();
		formData.append("productTitle", title);
		formData.append("productPrice", price);
		formData.append("productCategory", category);
		formData.append("productRegion", region);
		formData.append("productDesc", description);
		images.forEach((ele) => formData.append("images", ele));

		for (let fild of formData) {
			if (fild[1] === "undefined" || fild[1] === "0" || fild[1] === "") {
				setInputBlankError(true);
				return;
			} else {
				setInputBlankError(false);
			}
		}
		if (error === false && inputBlankError === false) {
			const response = await fetch("/api/products/", {
				method: "POST",
				credentials: "include",
				body: formData,
			});

			const data = await response.json();
			if (data.status === 201) {
				setLoading(false);
				navigator(`/product/${data.product._id}`, {
					state: { item: data.product },
				});
			} else {
				setLoading(false);
			}
		}
	};

	//check if user is auth to create a post
	useEffect(() => {
		if (AUTH_USER === null) navigator("/signin");
	}, []);

	const handleImage = (e) => {
		if (e.target.files.length > 6) {
			setError(true);
			return;
		} else {
			setError(false);
			setImages([...e.target.files]);
		}
	};

	const handleInput = (e) => {
		switch (e.target.name) {
			case "title":
				setTitle(e.target.value);
				break;
			case "price":
				setPrice(e.target.value);
				break;
			case "region":
				setRegion(e.target.value);
				break;
			case "category":
				setCategory(e.target.value);
				break;
			case "description":
				setDescription(e.target.value);
				break;
			default:
				return;
		}
	};

	return (
		<>
			{loading ? <Loading message="creating your product now " /> : ""}
			<div id="sell-page">
				<form id="sell-form">
					<div id="error-show" className={error ? "showErr" : "hideErr"}>
						<p>
							Must select at least one pic/Number of images cannot surpass 6
						</p>
					</div>
					<div
						id="error-show"
						className={inputBlankError ? "showErr" : "hideErr"}
					>
						<p>Fields cannot be empty</p>
					</div>
					<span className="sell-form-item">
						<label htmlFor="title">Product Title</label>
						<input
							className="text-input-sell"
							name="title"
							type="text"
							required
							autoFocus
							value={title}
							onChange={(e) => handleInput(e)}
						/>
					</span>
					<br />
					<span className="sell-form-item">
						<label htmlFor="title">Product Price</label>
						<input
							className="text-input-sell"
							name="price"
							type="text"
							value={price === 0 ? "" : price}
							onChange={(e) => handleInput(e)}
							required
						/>
					</span>
					<br />
					<span className="sell-form-item">
						<label htmlFor="select-categ">Product Categorie</label>
						<select
							name="category"
							id="select-option-sell"
							className="text-input-sell"
							value={category}
							defaultValue={"--categoire--"}
							onChange={(e) => handleInput(e)}
						>
							<option value="--categoire--" disabled>
								--choose a categoire--
							</option>
							<option value="Cars">Cars</option>
							<option value="Houses">Houses</option>
							<option value="Fashion">Fashion</option>
							<option value="Electronics">Electronics</option>
							<option value="Services">Services</option>
							<option value="Other">Other</option>
						</select>
					</span>
					<span className="sell-form-item">
						<label htmlFor="select-categ">Region</label>
						<select
							name="region"
							id="select-option-sell"
							className="text-input-sell"
							value={region}
							defaultValue={"--region--"}
							onChange={(e) => handleInput(e)}
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
					</span>
					<span className="sell-form-item">
						<label>Product Description </label>
						<textarea
							className="text-input-sell"
							cols="20"
							rows="5"
							name="description"
							value={description}
							onChange={(e) => handleInput(e)}
							required
						/>
					</span>
					<br />
					<span id="select-pics" className="sell-form-item">
						<label>Product Pictures </label>
						<input
							id="pic-sell-input"
							type="file"
							multiple
							required
							onChange={handleImage}
						/>
						<label htmlFor="pic-sell-input">
							{images.length === 0
								? "Click here to upload up to 6 pictures"
								: `${images.length} pictures selected. Tap to select more`}
						</label>
					</span>
					<br />
					<span className="sell-form-item">
						<button id="submit-sell-btn" type="submit" onClick={submitPost}>
							{loading ? "Submiting..." : "Submit"}
						</button>
						<button
							id="reset-sell-btn"
							onClick={() => {
								setImages([]);
								setTitle("");
								setPrice(0);
								setCategory();
								setDescription("");
								setRegion();
								setInputBlankError(false);
								setError(false);
							}}
						>
							Clear
						</button>
					</span>
				</form>
			</div>
		</>
	);
}

export default Sell;
