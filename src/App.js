import React, {useState} from "react";
import { Credentials } from './components/credentials'
import "./App.css";
import Dropdown from "./components/dropdown";
import axios from 'axios'


function App() {
  const data = [
    { value: 1, name: "A" },
    { value: 2, name: "B" },
    { value: 3, name: "C" },
  ];
  const spotify = Credentials();
  const [token, setToken] = useState("")
  return (
		<div className="App">
			<Dropdown options={data} />
		</div>
	);
}

export default App;
