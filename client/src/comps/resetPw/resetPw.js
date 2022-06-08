import React, { useState } from "react";
import "./resetPw.scss";
import { Link, useNavigate } from "react-router-dom";

const ResetPw = () => {
	const navigator = useNavigate();
	const [email, setEmail] = useState("");
	const [userCode, setUserCode] = useState("");
	const [newPw, setNewPw] = useState("");
	const [pwVerification, setPwVerification] = useState("");
	const [error, setError] = useState("");
	const [info, setInfo] = useState("");
	const [disableEmailBtn, setDisableEmailBtn] = useState(false);
	const [disableResetBtn, setDisableResetBtn] = useState(false);
	const [partOne, setPartOne] = useState(true);

	const sendMail = async () => {
		setDisableEmailBtn(true);
		const response = await fetch("/api/sendemail", {
			method: "POST",
			headers: { "content-type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ email }),
		});
		const { status, message } = await response.json();
		if (status === 200 && message === "email sent") {
			setPartOne(false);
		} else if (status === 404 && message === "email not found") {
			setDisableEmailBtn(false);
			setError(
				"This email does not belong to any account ! please try again !"
			);
		} else {
			setDisableEmailBtn(false);
			setError("An Error has occured ! please try again !");
		}
	};

	const resetPw = async () => {
		setDisableResetBtn(true);
		if (newPw !== pwVerification) {
			setError("Passwords must match ! please try again");
			return;
		}

		const response = await fetch("/api/resetpassword", {
			method: "POST",
			headers: { "content-type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ userCode, newPw }),
		});

		const { status, message } = await response.json();

		console.log(status);
		if (status === 400 && message === "Invalid Code(s)")
			setError("Your Code is incorrect ! Please check it");
		if (status === 201 && message === "Password Updated Succefully !")
			setInfo(message);
	};

	const handleChange = (e) => {
		switch (e.target.name) {
			case "email":
				setEmail(e.target.value);
				break;
			case "newPw":
				setNewPw(e.target.value);
				break;
			case "pwVerification":
				setPwVerification(e.target.value);
				break;
			case "userCode":
				setUserCode(e.target.value);
				break;
			default:
				return;
		}
	};

	return (
		<div id="reset-pw">
			<div className={error.length > 0 ? "show-sub-div" : "hide-sub-div"}>
				<div>
					<p>{error}</p>
					<button
						onClick={() => {
							setDisableResetBtn(false);
							setError(false);
						}}
					>
						Okay i get it
					</button>
				</div>
			</div>
			<div className={info.length > 0 ? "show-sub-div" : "hide-sub-div"}>
				<div>
					<p>{info}</p>
					<button onClick={() => navigator("/signin")}>Let's Go</button>
				</div>
			</div>
			<div className={partOne ? "show-div" : "hide-div"}>
				<div>
					<label for="emailInput">Please enter your email : </label>
					<input
						id="emailInput"
						type="email"
						name="email"
						value={email}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<button onClick={sendMail} disabled={disableEmailBtn}>
					{disableEmailBtn ? "Sending email now..." : "Send Me the email"}
				</button>
			</div>
			<div className={partOne ? "hide-div" : "show-div"}>
				<p>
					Please Check your Email to get the verification code, if you can't
					find it please chek your spam
				</p>
				<div>
					<label for="codeInput">Verification code : </label>
					<input
						id="codeInput"
						type="text"
						name="userCode"
						value={userCode}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div>
					<label for="password">Enter your new password : </label>
					<input
						id="password"
						type="password"
						name="newPw"
						value={newPw}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div>
					<label for="pw-verif">Repeat your password : </label>
					<input
						id="pw-verif"
						type="password"
						name="pwVerification"
						value={pwVerification}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<button onClick={resetPw}>
					{" "}
					{disableResetBtn ? "Updating Password..." : "Update My Password"}{" "}
				</button>
			</div>
			<div id="links">
				<p>
					<Link to="/signin">&#62;Back To log in</Link>
				</p>
				<p>
					<Link to="/catg">&#62; Keep Browsing</Link>
				</p>
			</div>
		</div>
	);
};

export default ResetPw;
