import React from "react";
import "./prevArticle.scss";
import Slider from "../picSlide/picSlide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function PrevArticle(props) {
	const locationPath = useLocation().pathname;

	return (
		<main id="prev-main">
			<div id="prev-display">
				<div id="close-prev-display" tabIndex="0">
					<button onClick={props.closeArticle}>
						<FontAwesomeIcon icon={faWindowClose} />
					</button>
				</div>
				<h1 id="item-header">{props.item.title}</h1>
				<Slider images={props.item.images} />
				<p className="item-desc">
					<span>Price:</span>
					{props.item.price + "$ "}
					<span>Published:</span>
					{new Date(props.item.pubDate).toLocaleString("en-US", {
						month: "long",
					})}{" "}
					{new Date(props.item.pubDate).getFullYear()}
				</p>
				<div className="article-btns">
					<Link
						id="full-artc-link"
						to={`/product/${props.item._id}`}
						state={{item : props.item}}
					>
						I'm in !&nbsp;
						<FontAwesomeIcon icon={faBoxOpen} />
					</Link>
				</div>
			</div>
		</main>
	);
}

export default PrevArticle;
