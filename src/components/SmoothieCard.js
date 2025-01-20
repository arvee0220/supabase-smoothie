import { Link } from "react-router-dom";

const SmoothieCard = ({ smoothie }) => {
	const { title, method, rating } = smoothie;
	return (
		<div className="smoothie-card">
			<h3>{title}</h3>
			<p>{method}</p>
			<div className="rating">{rating}</div>
			<div className="buttons">
				<Link to={"/" + smoothie.id}>
					<i className="material-icons">edit</i>
				</Link>
			</div>
		</div>
	);
};

export default SmoothieCard;
