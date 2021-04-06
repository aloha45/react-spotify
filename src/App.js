import React, { useState, useEffect } from "react";
import { Credentials } from "./components/credentials";
import "./App.css";
import Dropdown from "./components/dropdown";
import axios from "axios";

function App() {
	const spotify = Credentials();
	const [token, setToken] = useState("");
	const [genres, setGenres] = useState({
		selectedGenre: "",
		listOfGenres: [],
	});

	useEffect(() => {
		axios("https://accounts.spotify.com/api/token", {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization:
					"Basic " + btoa(spotify.ClientId + ":" + spotify.ClientSecret),
			},
			data: "grant_type=client_credentials",
			method: "POST",
		}).then((tokenResponse) => {
			setToken(tokenResponse.data.access_token);

			axios("https://api.spotify.com/v1/browse/categories?locale=sv_US", {
				method: "GET",
				headers: { Authorization: "Bearer " + tokenResponse.data.access_token },
			}).then((genreResponse) => {
				setGenres({
					selectedGenre: genres.selectedGenre,
					listOfGenres: genreResponse.data.categories.items,
				});
			});
		});
	}, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]); 
	
	const genreChanged = (val) => {
		setGenres({
			selectedGenre: val,
			listOfGenres: genres.listOfGenres,
		});
	};

	return (
		<form onSubmit={() => {}}>
			<div className="container">
				<Dropdown
					options={genres.listOfGenres}
					selectedValue={genres.selectedGenre}
					changed={genreChanged}
				/>
				<button type="submit">Search</button>
			</div>
		</form>
	);
}

export default App;
