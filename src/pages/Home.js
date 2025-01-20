import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
	const [fetchError, setFetchError] = useState(null);
	const [smoothies, setSmoothies] = useState(null);

	useEffect(() => {
		const fetchSmoothies = async () => {
			try {
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
			}
		};

		fetchSmoothies();
	}, []);

  const deleteData = (id) => {
    setSmoothies((prev) => prev.filter((smoothie) => smoothie.id !== id));
  };

	return (
		<div className="page home">
			<h2>Home</h2>
			{fetchError && <p>{fetchError}</p>}
			{smoothies && (
				<div className="smoothies">
					<div className="smoothie-grid">
						{smoothies.map((smoothie) => (
							<SmoothieCard
								smoothie={smoothie}
								key={smoothie.id}
								onDelete={deleteData}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;
