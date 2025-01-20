import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
	const [fetchError, setFetchError] = useState(null);
	const [smoothies, setSmoothies] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchSmoothies = async () => {
			try {
				setIsLoading(true);
				const { data, error } = await supabase
					.from("smoothies")
					.select()
					.order("rating", { ascending: false });

				if (error) {
					setFetchError("Could not fetch smoothies");
					console.log(error);
					setSmoothies(null);
				}

				if (data) {
					setSmoothies(data);
					setFetchError(null);
				}
			} catch (e) {
				console.log(e);
				setFetchError("An unexpected error occurred while fetching smoothies");
			} finally {
				setIsLoading(false);
			}
		};

		fetchSmoothies();
	}, []);

	const deleteData = async (id) => {
		setSmoothies((prev) => prev.filter((smoothie) => smoothie.id !== id));

		try {
			const { error } = await supabase.from("smoothies").delete().eq("id", id);

			if (error) {
				console.error("Error deleting smoothie:", error);

				setSmoothies((prev) => [...prev, smoothies.find((smoothie) => smoothie.id === id)]);
			}
		} catch (error) {
			console.error("Unexpected error during delete:", error);

			setSmoothies((prev) => [...prev, smoothies.find((smoothie) => smoothie.id === id)]);
		}
	};

	return (
		<div className="page home">
			<h2>Home</h2>
			{fetchError && <p>{fetchError}</p>}
			{isLoading ? (
				<p>Loading smoothies...</p>
			) : (
				<div className="smoothies">
					<div className="smoothie-grid">
						{smoothies && smoothies.length > 0 ? (
							smoothies.map((smoothie) => (
								<SmoothieCard
									smoothie={smoothie}
									key={smoothie.id}
									onDelete={deleteData}
								/>
							))
						) : (
							<p>No smoothies available</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;
