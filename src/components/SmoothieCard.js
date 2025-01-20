import { Link } from "react-router-dom";

const SmoothieCard = ({ smoothie, onDelete }) => {
	const { id, title, method, rating } = smoothie;

	const handleDelete = () => {
		if (typeof onDelete === "function") {
			onDelete(id);
		} else {
			console.error("onDelete is not a function");
		}
	};

	return (
		<div className="smoothie-card">
			<h3>{title}</h3>
			<p>{method}</p>
			<div className="rating">{rating}/10</div>
			<div className="buttons">
				<Link to={"/" + id}>
					<i className="material-icons">edit</i>
				</Link>
				<i className="material-icons" onClick={handleDelete}>
					delete
				</i>
			</div>
		</div>
	);
};

export default SmoothieCard;
