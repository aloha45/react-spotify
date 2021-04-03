import React, { useState } from "react";
import { Credentials } from "./components/credentials";
import "./App.css";
import Dropdown from "./components/dropdown";
import axios from "axios";

function App() {
	const data = [
		{ value: 1, name: "A" },
		{ value: 2, name: "B" },
		{ value: 3, name: "C" },
	];

	const spotify = Credentials();
	const [token, setToken] = useState("");
  console.log(spotify)
axios("https://accounts.spotify.com/api/token", {
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
		"Authorization" : "Basic " + btoa(spotify.ClientId + ":" + spotify.ClientSecret),
	},
	data: "grant_type=client_credentials",
	method: "POST",
}).then((tokenResponse) => {
	console.log(tokenResponse);
});
	return (
		<div className="App">
			<Dropdown options={data} />
		</div>
	);
}

export default App;
