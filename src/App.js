import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dropdown from './components/dropdown';

const data = [
	{ value: 1, name: "A" },
	{ value: 2, name: "B" },
	{ value: 3, name: "C" },
];

function App() {
  return (
    <div className="App">
      <Dropdown options={data}/>
    </div>
  );
}

export default App;
