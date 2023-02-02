import React from 'react'

export default function TableItem(props) {
	const { name, way, date } = props.form;
	console.log('prop ---', props.form, '\n name--', name, props.id);
	return (
		<>
			<div className="card_list">
				<div className='card_item'>
					<div className="card_date">{date}</div>
					<div className="card_way">{way}</div>
					<button className="button2">&#9998;</button>
					<button className="button3" onClick={(id) => props.delete(id)}>&#10008;</button>
				</div>
			</div>
		</>
	)
}