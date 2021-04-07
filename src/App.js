import React, { useState, useEffect } from "react";
import { Credentials } from "./components/credentials";
import "./App.css";
import Dropdown from "./components/Dropdown";
import axios from "axios";
import Listbox from "./components/Listbox";
import Details from "./components/Detail";

function App() {
	const spotify = Credentials();
	const [token, setToken] = useState("");
	const [genres, setGenres] = useState({
		selectedGenre: "",
		listOfGenres: [],
	});
	const [playlist, setPlaylist] = useState({
		selectedPlaylist: "",
		listofPlaylists: [],
	});
	const [tracks, setTracks] = useState({ selectedTrack: "", listOfTracks: [] });
	const [trackDetail, setTrackDetail] = useState(null);

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

		axios(
			`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`,
			{
				method: "GET",
				headers: { Authorization: "Bearer " + token },
			}
		).then((playlistResponse) => {
			console.log("playlist", playlistResponse);
			setPlaylist({
				selectedPlaylist: playlist.selectedPlaylist,
				listofPlaylists: playlistResponse.data.playlists.items,
			});
		});
	};

	const playlistChanged = (val) => {
		setPlaylist({
			selectedPlaylist: val,
			listofPlaylists: playlist.listofPlaylists,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		axios(
			`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`,
			{
				method: "GET",
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		).then((tracksResponse) => {
			console.log("tracks", tracksResponse);
			setTracks({
				selectedTrack: tracks.selectedTrack,
				listOfTracks: tracksResponse.data.items,
			});
		});
	};

	const listBoxClicked = (val) => {
		const currentTracks = [...tracks.listOfTracks];
		const trackInfo = currentTracks.filter((t) => t.track.id === val);
		console.log("trackInfo", trackInfo);
		console.log(trackInfo[0].track.external_urls.spotify)
		setTrackDetail(trackInfo[0].track);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="container">
				<Dropdown
					options={genres.listOfGenres}
					selectedValue={genres.selectedGenre}
					changed={genreChanged}
				/>
				<Dropdown
					options={playlist.listofPlaylists}
					selectedValue={playlist.selectedPlaylist}
					changed={playlistChanged}
				/>
				<button type="submit">Search</button>
				<Listbox items={tracks.listOfTracks} clicked={listBoxClicked} />
				{trackDetail && <Details {...trackDetail} /> }
			</div>
		</form>
	);
}

export default App;
