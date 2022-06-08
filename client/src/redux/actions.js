/**
 * -------------- USER ACTIONS ----------------
 */
const logoutAction = () => {
	return {
		type: "LOGOUT_USER",
	};
};
const loginAction = (userID, username, isAuth) => {
	return {
		type: "LOGIN_USER",
		userID,
		username,
		isAuth,
	};
};

/**
 * -------------- SEARCH ACTIONS ----------------
 */

const searchAddAction = (searchVal) => {
	return {
		type: "ADD_SEARCH",
		searchVal,
	};
};

export { loginAction, logoutAction,searchAddAction };
