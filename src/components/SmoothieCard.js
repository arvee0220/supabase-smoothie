import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";

const SmoothieCard = ({ smoothie, onDelete }) => {
	const { id, title, method, rating } = smoothie;

	const deleteHandler = async () => {
		try {
			const { error } = await supabase.from("smoothies").delete().eq("id", id);

			if (onDelete) onDelete(id);

			if (error) {
				console.log(error);
			}
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<div className="smoothie-card">
			<h3>{title}</h3>
			<p>{method}</p>
			<div className="rating">{rating}</div>
			<div className="buttons">
				<Link to={"/" + smoothie.id}>
					<i className="material-icons">edit</i>
				</Link>
				<i className="material-icons" onClick={deleteHandler}>
					delete
				</i>
			</div>
		</div>
	);
};

export default SmoothieCard;
