import { useState } from "react";
import supabase from "../config/supabaseClient";

const Create = () => {
	const [title, setTitle] = useState("");
	const [method, setMethod] = useState("");
	const [rating, setRating] = useState("");
	const [formError, setFormError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!title || !method || !rating) {
			setFormError("Please fill in all the fields correctly");
			return;
		}

		console.log("Submitting data:", { title, method, rating });

		try {
			const { data, error } = await supabase
				.from("smoothies")
				.insert([{ title, method, rating: parseInt(rating, 10) }])
				.select("*");

			console.log("Response:", { data, error });

			if (error) {
				console.error("Insert error:", error);
				setFormError("An error occurred while saving the smoothie.");
			} else {
				console.log("Inserted data:", data);
				setFormError(null);
			}
		} catch (err) {
			console.error("Unexpected error:", err);
		}
	};

	return (
		<div className="page create">
			<h2>Create</h2>
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
				<button type="submit">Create Smoothie Recipe</button>
				{formError && <p className="error">{formError}</p>}
			</form>
		</div>
	);
};

export default Create;
