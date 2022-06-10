import "./navbar.scss";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLock,
	faList,
	faSearch,
	faAlignJustify,
	faPlus,
	faSignOutAlt,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { searchAddAction, logoutAction } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const NavBar = () => {
	const [isToggled, setIsToggled] = useState(false);
	const [searchBar, setSearchBar] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const dispatchSearch = useDispatch();
	const navigation = useNavigate();
	const isUserAuth = useSelector((state) => state.logInOutRed.isAuth);
	const dispatcher = useDispatch();

	const logout = () => {
		fetch("/api/logout", {
			method: "POST",
			credentials: "include",
		}).then((res) => {
			res.json().then((data) => {
				if (data.status === 200) {
					dispatcher(logoutAction());
					navigation("/");
				}
			});
		});
	};

	const dropdownCLick = () => {
		setIsToggled(!isToggled);
	};

	const showSearch = () => {
		setSearchBar(!searchBar);
	};

	const handleSearchInput = (e) => {
		setSearchValue(e.target.value);
	};

	const submitSearch = () => {
		dispatchSearch(searchAddAction(searchValue));
		setSearchBar(false);
		setSearchValue("");
		navigation("/catg/search");
	};

	return (
		<nav
			id="navBar"
			onClick={() => {
				if (isToggled) dropdownCLick();
			}}
		>
			<Link to="/">
				<h3 id="brand">Market</h3>
			</Link>
			{/* search box */}
			<div id="search">
				<div
					id="search-box"
					className={searchBar ? "show-search" : "not-show-search"}
				>
					<input
						value={searchValue}
						id="search-box"
						type="text"
						placeholder="(Example: cars,houses...)"
						onChange={handleSearchInput}
					/>
					<button  id="search-btn" onClick={submitSearch}>
						Search
					</button>
				</div>

				<button aria-label="show-search-box" id="showsearchbtn" onClick={showSearch} tabIndex="0">
					<FontAwesomeIcon id="searchlogo" icon={faSearch} />
				</button>
			</div>
			{/* navigation links */}
			<ul id="navigationsLinks">
				<Link to="/sell" className="navItems">
					<li>
						<FontAwesomeIcon className="nav-icons" icon={faPlus} />
						&nbsp;Sell
					</li>
				</Link>
				<Link to="/catg" className="navItems">
					<li>
						<FontAwesomeIcon className="nav-icons" icon={faList} />
						&nbsp;Categories
					</li>
				</Link>
				{isUserAuth ? (
					<>
						<Link to="/myproducts" className="navItems">
							<li>
								<FontAwesomeIcon className="nav-icons" icon={faUser} />
								&nbsp; Profile
							</li>
						</Link>
						<li className="navItems" onClick={logout}>
							<FontAwesomeIcon className="nav-icons" icon={faSignOutAlt} />
							&nbsp; Logout
						</li>
					</>
				) : (
					<Link to="/signin" className="navItems">
						<li>
							<FontAwesomeIcon className="nav-icons" icon={faLock} />
							&nbsp; Sign in
						</li>
					</Link>
				)}
			</ul>
			{/* dropdwn menu responsive */}
			<div id="drpdwn">
				<div id="drpdwnbtn">
					<FontAwesomeIcon
						className={isToggled ? "drpdwn-icon-tog" : "drpdwn-icon-nrm"}
						icon={faAlignJustify}
						onClick={dropdownCLick}
					/>
				</div>
				<ul id="drp-menu" className={isToggled ? "toggled" : "not-toggled"}>
					<li className="dopdownitems">
						<Link className="dopdownlinks" to="/catg">
							<FontAwesomeIcon className="nav-icons" icon={faList} />
							&nbsp;Categories
						</Link>
					</li>
					<hr />
					{isUserAuth ? (
						<>
							<li className="dopdownitems">
								<Link className="dopdownlinks" to="/sell">
									<FontAwesomeIcon className="nav-icons" icon={faPlus} />
									&nbsp;Sell
								</Link>
							</li>
							<hr />
							<li className="dopdownitems">
								<Link className="dopdownlinks" to="/myproducts">
									<FontAwesomeIcon className="nav-icons" icon={faUser} />
									&nbsp;Profile
								</Link>
							</li>
							<hr />
							<li className="dopdownlinks" onClick={logout}>
								<FontAwesomeIcon className="nav-icons" icon={faSignOutAlt} />
								&nbsp;Logout
							</li>
						</>
					) : (
						<li className="dopdownitems">
							<Link className="dopdownlinks" to="/signin">
								<FontAwesomeIcon className="nav-icons" icon={faLock} />
								&nbsp;Sign in
							</Link>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default NavBar;
