import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
	const [fetchError, setFetchError] = useState(null);
	const [smoothies, setSmoothies] = useState(null);

	useEffect(() => {
		const fetchSmoothies = async () => {
			try {
				const { data, error } = await supabase.from("smoothies").select();

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
				console.table(e);
			}
		};

		fetchSmoothies();
	}, []);

	return (
		<div className="page home">
			<h2>Home</h2>
			{fetchError && <p>{fetchError}</p>}
			{smoothies && (
				<div className="smoothies">
					<div className="smoothie-grid">
						{smoothies.map((smoothie) => (
							<SmoothieCard smoothie={smoothie} key={smoothie.id} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;
