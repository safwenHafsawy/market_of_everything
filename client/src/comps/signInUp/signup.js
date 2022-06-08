import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/actions";

function SignUp(props) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState(0);
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const storeDispatch = useDispatch();

	const sumbitForm = async (e) => {
		e.preventDefault();

		//email validation
		const emailPatt = new RegExp(/\S+@\S+\.\S+/, "gi");
		if (!emailPatt.test(email)) {
			props.handleError(
				"Your Email address is not valid ! Please Enter a valid one !"
			);
			return;
		}
		//phone verifiaction
		const phonePattern = new RegExp(/^(\+|0{2})[0-9]{11}$|^[0-9]{8}$/, "g");
		if (!phonePattern.test(phone)) {
			props.handleError(
				"Your phone number is not valid ! Please Enter a valid one !"
			);
			return;
		}

		const userCred = { username, email, phone, password };

		for (let field in userCred) {
			if (userCred[field] === "" || userCred[field] === 0) {
				props.handleError("All fields are required ! please try again");
				return;
			}
		}

		const response = await fetch("/api/signup", {
			method: "POST",
			headers: { "content-type": "application/json" },
			credentials: "include",
			body: JSON.stringify(userCred),
		});

		const data = await response.json();

		const { status, message } = data;

		if (status === 201) {
			props.handleError(message);
			setTimeout(() => {
				props.toSignIn(true);
			}, 2000);
		} else {
			props.handleError(message);
		}
	};

	const handleInput = (e) => {
		switch (e.target.name) {
			case "username":
				setUsername(e.target.value);
				break;
			case "email":
				setEmail(e.target.value);
				break;
			case "phone":
				setPhone(e.target.value);
				break;
			case "password":
				setPassword(e.target.value);
				break;
			default:
				break;
		}
	};

	return (
		<form id="signup-form-container" className="account-access-form">
			<br />
			<label className="form-item" htmlFor="username">
				<span>Username</span>
				<input
					name="username"
					type="text"
					value={username}
					onChange={handleInput}
					required
				/>
			</label>
			<br />
			<label className="form-item" htmlFor="email">
				<span>Email</span>{" "}
				<input
					name="email"
					type="text"
					value={email}
					onChange={handleInput}
					required
				/>
			</label>
			<br />
			<label className="form-item" htmlFor="phone">
				<span>Phone</span>{" "}
				<input
					name="phone"
					value={phone === 0 ? "" : phone}
					type="tel"
					onChange={handleInput}
					required
				/>
			</label>
			<br />
			<label className="form-item" htmlFor="pwd">
				<span>Password</span>
				<input
					name="password"
					type="Password"
					value={password}
					onChange={handleInput}
					required
				/>
			</label>
			<br />
			<span className="form-item">
				<button type="submit" className="form-btn" onClick={sumbitForm}>
					Sign Up !
				</button>
			</span>
			<span className="form-item"></span>
		</form>
	);
}

export default SignUp;
