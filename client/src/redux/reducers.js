/**
 * -------------- INIT STATES ----------------
 */

const initUser = { userID: null, username: null, isAuth: false };
const initSearch = { searchVal: "" };

/**
 * -------------- REDUCERS ----------------
 */

const logInOutRed = (state = initUser, action) => {
	switch (action.type) {
		case "LOGIN_USER":
			return {
				userID: action.userID,
				username: action.username,
				isAuth: action.isAuth,
			};
		case "LOGOUT_USER":
			return {
				userID: null,
				username: null,
				isAuth: false,
			};
		default:
			return state;
	}
};

const searchRed = (state = initSearch, action) => {
	switch (action.type) {
		case "ADD_SEARCH":
			return {
				searchKey: action.searchKey,
				searchVal: action.searchVal,
			};
		default:
			return state;
	}
};

export { logInOutRed, searchRed };
