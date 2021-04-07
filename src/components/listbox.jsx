import React from "react";

const Listbox = (props) => {
	const click = (e) => {
		e.preventDefault();
    props.clicked(e.target.id)
	};
	return (
		<div>
			{props.items.map((item, idx) => (
				<button key={idx} id={item.track.id} onClick={click}>
					{item.track.name}
				</button>
			))}
		</div>
	);
};

export default Listbox;
