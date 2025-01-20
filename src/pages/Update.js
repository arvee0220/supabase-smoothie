import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Update = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [method, setMethod] = useState("");
	const [rating, setRating] = useState("");
	const [formError, setFormError] = useState(null);

	useEffect(() => {
		const fetchSmoothie = async () => {
			try {
				const { data, error } = await supabase
					.from("smoothies")
					.select("*")
					.eq("id", id)
					.single();

				if (error) {
					navigate("/", { replace: true });
				}

				if (data) {
					setTitle(data.title);
					setMethod(data.method);
					setRating(data.rating);
					setFormError(null);
					console.table(data);
				}
			} catch (e) {
				console.log(e);
			}
		};

		fetchSmoothie();
	}, [id, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!title || !method || !rating) {
			setFormError("Please fill in all the fields correctly");
			return;
		}

		try {
			const { data, error } = await supabase
				.from("smoothies")
				.update({ title, method, rating: parseInt(rating, 10) })
				.eq("id", id)
				.select("*");

			console.log("Response:", { data, error });

			if (error) {
				console.error("Insert error:", error);
				setFormError("An error occurred while saving the smoothie.");
			} else {
				console.log("Updated data:", data);
				setFormError(null);
				navigate("/");
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="page create">
			<form onSubmit={handleSubmit}>
				<label htmlFor="title">Title:</label>
				<input
					type="text"
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<label htmlFor="method">Method:</label>
				<textarea id="method" value={method} onChange={(e) => setMethod(e.target.value)} />

				<label htmlFor="rating">Rating:</label>
				<input
					type="number"
					id="rating"
					value={rating}
					onChange={(e) => setRating(e.target.value)}
				/>
				<div className="update-buttons">
					<button type="submit">Update Smoothie</button>
					<button>
						<Link to={"/"} className="link">
							Cancel
						</Link>
					</button>
				</div>
				{formError && <p className="error">{formError}</p>}
			</form>
		</div>
	);
};

export default Update;
