import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./fullArticle.scss";
import PicCol from "../picSlide/picCollage";
import { useSelector } from "react-redux";

const FullArticle = () => {
	const loc = useLocation();
	const [item] = useState(loc.state.item);
	const [displayCollage, setDisplayCollage] = useState(false);
	const [pageDisplayed, setPageDisplayed] = useState(true);
	const [showPubInfo, setShowPubInfo] = useState(false);
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const currentUserID = useSelector((state) => state.logInOutRed.userID);

	const contactPublisher = () => {
		fetch(`/api/userinfo?id=${item.author}`).then(
			(response) =>
				response.json().then((data) => {
					setEmail(data.userInfo.email);
					setPhone(data.userInfo.phone);
					setShowPubInfo(true);
				})
		);
	};

	const deleteProd = () => {
		fetch(`/api/products/${item._id}`, {
			method: "DELETE",
			credentials: "include",
		}).then((res) => {
			res.json().then((data) => {
				if (data.status === 201) {
					setError("Your Product was Deleted successfully !");
				}
				else setError("Ooops ! Product could not be deleted ! please try again");
			});
		});
	};
	return (
		<div id="full-article-main">
			<div className={error.length > 0 ? "show-error-div" : "hide-error-div"}>
				<div>
					<p>{error}</p>
					<button
						onClick={() => {
							setError("");
							navigate("/myproducts");
						}}
					>
						Okay i get it !
					</button>
				</div>
			</div>
			<div
				id="published-info-container"
				className={showPubInfo ? "info-shown" : "info-hidden"}
			>
				<div id="publisher-info">
					<div>
						<p>
							<span>Phone number: {phone}</span>{" "}
						</p>
						<p>
							<span> Email: {email}</span>{" "}
						</p>
					</div>
					<button id="go-back-btn" onClick={() => setShowPubInfo(false)}>
						Go back
					</button>
				</div>
			</div>
			<div id="item-header">
				<h1>{item.title}</h1>
			</div>
			<div id="item-display-data">
				<div id="slider-img">
					<div
						id="regular-images-display"
						onClick={() => {
							setDisplayCollage(true);
							setPageDisplayed(false);
						}}
					>
						<img src={item.images[0]} alt="product" />
						<img src={item.images[1]} alt="product" />

						<button>View Pictures</button>
					</div>
					<PicCol
						images={item.images}
						displayed={displayCollage}
						closeDisplay={setDisplayCollage}
						displayPage={setPageDisplayed}
					/>
				</div>
				<div className={pageDisplayed ? "item-data" : "not-displayed"}>
					<p className="item-desc">
						<span>
							About: <br />
						</span>
						{item.desc}
					</p>
					<p id="price-date">
						<span>Price: </span>
						{item.price + "$ "} <br />
						<span>Published:</span>{" "}
						{new Date(item.pubDate).toLocaleString("en-US", { month: "long" })}
						{new Date(item.pubDate).getFullYear()} <br />
						<span> Region:</span>
						{item.region}
					</p>
					<div className="article-btns">
						{item.author !== currentUserID ? (
							<>
								<button onClick={contactPublisher}>Publisher Info</button>
								<button onClick={() => navigate(-1)}>I'll keep looking</button>
							</>
						) : (
							<>
								<button onClick={deleteProd}>Delete Product</button>
								<button
									onClick={() =>
										navigate(`/product/update/${item._id}`, { state: { item } })
									}
								>
									Update Product
								</button>
								<button onClick={() => navigate("/myproducts")}>
									Check my other products
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FullArticle;
