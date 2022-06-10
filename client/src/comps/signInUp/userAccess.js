import React, { useState } from "react";
import { Link } from "react-router-dom";
import Signin from "./signin";
import SignUp from "./signup";
import "./useraccess.scss";
import Loading from "../loading/loading.js";

function UserAcces() {
	const [signIn, setSignIn] = useState(true);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	return (
		<div id="useraccess-full">
			{loading ? (
				<Loading
					message={
						signIn ? "checking your credentials" : "Creating your account"
					}
				/>
			) : (
				""
			)}
			<div className={error.length > 0 ? "show-error-div" : "hide-error-div"}>
				<div>
					<p>{error}</p>
					<button onClick={() => setError("")}>Okay i get it !</button>
				</div>
			</div>
			<div id="display-opt">
				<div id="forms">
					{signIn ? (
						<Signin showLoading={setLoading} handleError={setError} />
					) : (
						<SignUp
							showLoading={setLoading}
							handleError={setError}
							toSignIn={setSignIn}
						/>
					)}
				</div>
				<div id="signin-altr">
					{signIn ? (
						<p>
							Don't have an account ?
							<span onClick={() => setSignIn(false)}> Sign up !</span>
						</p>
					) : (
						<p>
							Already has an account ?
							<span onClick={() => setSignIn(true)}> Sign In !</span>
						</p>
					)}
					<p>
						Forgot password ? <Link to="/resetpassword">Reset Password !</Link>
					</p>
					<p>
						Don't want to Log in ? <Link to="/catg">Keep Browsing !</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default UserAcces;
