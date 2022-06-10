import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/actions";

function Signin(props) {
	let isUserAuth = useSelector((state) => state.logInOutRed.isAuth);
	const [identifier, setIdentifier] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const storeDispatch = useDispatch();

	const submitForm = async (e) => {
		e.preventDefault();
		props.showLoading(true);
		const credential = { identifier, password_v: password };

		const response = await fetch("/api/login", {
			method: "POST",
			headers: { "content-type": "application/json" },
			credentials: "include",
			body: JSON.stringify(credential),
		});
		if (response.status === 401) {
			props.handleError(
				"Username or password is incorrect, Please try again !"
			);
		} else {
			const data = await response.json();
			if (data.status === 200) {
				storeDispatch(loginAction(data.userID, data.username, true));
				props.showLoading(false);
				navigate("/catg");
			} else {
				props.showLoading(false);
			}
		}
	};

	const handleInput = (e) => {
		if (e.target.name === "username") setIdentifier(e.target.value);
		if (e.target.name === "password") setPassword(e.target.value);
	};

	useEffect(() => {
		if (isUserAuth) navigate("/catg");
	}, []);

	return (
		<>
			<form id="signin-form" className="account-access-form">
				<label className="form-item" htmlFor="username">
					<span>Username</span>
					<input
						value={identifier}
						name="username"
						type="text"
						required
						autoFocus
						autoComplete="off"
						onChange={handleInput}
					/>
				</label>
				<br />
				<label className="form-item" htmlFor="username">
					<span>Password</span>
					<input
						name="password"
						type="Password"
						vlaue={password}
						onChange={handleInput}
						required
					/>
				</label>
				<br />
				<span className="form-item">
					<button type="submit" className="form-btn" onClick={submitForm}>
						Sign In
					</button>
				</span>
				<span className="form-item"></span>
			</form>
		</>
	);
}

export default Signin;
