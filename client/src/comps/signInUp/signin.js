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

	const submitForm = (e) => {
		e.preventDefault();
		const credential = { identifier, password_v: password };

		fetch("/api/login", {
			method: "POST",
			headers: { "content-type": "application/json" },
			credentials: "include",
			body: JSON.stringify(credential),
		}).then((data) => {
			if (data.status === 401) {
				props.handleError("Username or password is incorrect, Please try again !");
			} else {
				data.json().then((res) => {
					if (res.status === 200) {
						storeDispatch(loginAction(res.userID, res.username, true));
						navigate("/catg");
					}
				});
			}
		});
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
