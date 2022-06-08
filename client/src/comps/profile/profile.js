import React, { useState, useEffect } from "react";
import "./profile.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckAuth from "../checkAuth/checkAuth";

export default function Profile() {
	const userID = useSelector((state) => state.logInOutRed.userID);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState();
	const [products, setProducts] = useState([]);

	useEffect(() => {
		//fetching user info
		if (userID)
			fetch(`/api/userinfo?id=${userID}`).then((response) =>
				response.json().then((data) => {
					setUsername(data.userInfo.username);
					setEmail(data.userInfo.email);
					setPhone(data.userInfo.phone);
				})
			);

		//fetching user products
		fetch(`/api/getuserproducts?id=${userID}`).then((response) =>
			response.json().then((data) => {
				setProducts([...data.records]);
			})
		);
	}, [userID]);

	return (
		<div id="profilePage">
			<CheckAuth />
			<h3 id="username">{username}</h3>
			<div id="userInfo">
				<h4>
					<span>Email : </span>
					{email}
				</h4>
				<h4>
					<span>Phone number </span>: {phone}
				</h4>
			</div>
			<div id="userProducts">
				<h4>My Products :</h4>
				<ul id="product_list">
					{products.map((ele, ind) => {
						const date = new Date(ele.pubDate).toLocaleString("en-US", {
							year: "numeric",
							month: "long",
						});
						return (
							<li className="user_product" key={ind}>
								<Link to={`/product/${ele._id}`} state={{ item: ele }}>
									{ele.title} -- {date} -- {ele.price}$
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
