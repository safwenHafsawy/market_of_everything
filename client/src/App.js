import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./comps/home/home";
import FullArticle from "./comps/article/fullArticle";
import NavBar from "./comps/navbar/navbar";
import Categs from "./comps/categs/categs";
import Category from "./comps/categ/categ";
import PicCol from "./comps/picSlide/picCollage";
import UserAcces from "./comps/signInUp/userAccess";
import Sell from "./comps/sell/sell";
import Profile from "./comps/profile/profile.js";
import UpdateProduct from "./comps/article/updateArticle";
import ResetPw from "./comps/resetPw/resetPw.js";

function App() {  
	return (
		<div className="App">
			<NavBar />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/myproducts" element={<Profile />} />
					<Route path="/catg" element={<Categs />} />
					<Route path="/catg/:id" element={<Category />} />
					<Route path="/product/:id" element={<FullArticle />} />
					<Route path="/product/update/:id" element={<UpdateProduct />} />
					<Route path="/col" element={<PicCol />} />
					<Route path="/signin" element={<UserAcces />} />
					<Route path="/sell" element={<Sell />} />
					<Route path="/resetpassword" element={<ResetPw />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
