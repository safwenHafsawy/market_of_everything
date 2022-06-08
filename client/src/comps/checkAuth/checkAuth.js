import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/actions";

const CheckAuth = () => {
	const dispatcher = useDispatch();
	useEffect(async () => {
		const response = await fetch("/api/home", {
			method: "GET",
			headers: { "content-type": "application/json" },
			credentials: "include",
		});

		const data = await response.json();

		if (data.userID) dispatcher(loginAction(data.userID, data.username, true));
	}, []);
	return null;
};

export default CheckAuth;
