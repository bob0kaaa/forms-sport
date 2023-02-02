import React, { useState } from 'react';
import TableItem from './TableItem';
import shortid from 'shortid';

let forms = [];
let list = [];
let formIndex = [];
const clearForm = {
	name: '',
	date: '',
	way: '',
}

export default function SportListing() {
	const [form, setForm] = useState(clearForm);//данные формы

	const [lists, setLists] = useState([]); //список сохраненных форм по нажатии ок с ключами сгенерир

	const handleChange = (evt) => {
		const value = evt.target.value;
		const name = evt.target.name;
		setForm(prevForm => ({ ...prevForm, [name]: value, name: name }));
	}

	const handleSubmit = evt => {
		evt.preventDefault();

		if (form.date.match(/^([0]?[1-9]|[1|2][0-9]|[3][0|1])[.]([0]?[1-9]|[1][0-2])[.]([0-9]{2})$/)
			&& form.date !== ''
			&& (form.date.length === 10 || form.date.length === 8)) {

			const existDate = formIndex.findIndex((item) => item.value.date === form.date);
			if (existDate !== -1) {// сумирование
				formIndex[existDate].value.way = Number(formIndex[existDate].value.way) + Number(form.way);
			} else { //добавление
				setForm(prevForm => ({ ...prevForm, form }));

				forms.push(form);
				formIndex = forms.map((form) => ({ id: shortid.generate(), value: form }));
				console.log("массив при добавлении по нажатии ok", formIndex);

				//2 sortirovka sort не создает новый массив, а работает с исходным
				formIndex.sort((a, b) => new Date(b.value.date) - new Date(a.value.date)); //console.log("массив сортировки", formIndex);
			}

			// для отрисовки
			list = formIndex.map(formelement =>
				<li key={formelement.id}>
					{<TableItem form={formelement.value} id={formelement.id} delete={() => handleDelete(formelement.id)} />}
				</li>);

			setLists(list);//console.log("массив form  по нажатии ok", forms, formIndex, list, lists);
			setForm(clearForm);
		}
	}

	const handleDelete = (id) => {
		let list2 = formIndex.filter(item => item.id !== id);

		//2 sortirovka
		list2.sort((a, b) => {
			return new Date(b.value.date) - new Date(a.value.date);
		});

		list = list2.map(formelement =>
			<li key={formelement.id}>
				{<TableItem form={formelement.value} id={formelement.id} delete={() => handleDelete(formelement.id)} />}
			</li>);

		// найти и удалить форму в forms? по id из formindex
		const element = formIndex.find(item => item.id === id);//console.log("delete  element forms\n", element, element.value);
		let forms2 = [];
		forms2 = forms.filter((form) => form !== element.value);
		forms = forms2;
		//console.log("после delete  forms\n", forms);
		let formIndex1 = [];
		formIndex1 = formIndex.filter((form) => form !== element);
		formIndex = formIndex1;

		setForm(clearForm);
		setLists(list); //console.log("после delete  список\n", list, lists);
	}

	return (
		<>
			<form className='form_flex' onSubmit={handleSubmit}>
				<div className='body_form'>
					<div className='input_form'>
						<label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
						<input id="date" name="date" value={form.date} onChange={handleChange} />
					</div>
					<div className='input_form'>
						<label htmlFor="way">Пройдено км</label>
						<input id="way" name="way" value={form.way} onChange={handleChange} />
					</div>
					<div className='input_form'>
						<span className='span_button'>кнопка</span>
						<button className='button' type="submit">OK</button>
					</div>
				</div>

			</form>
			<div className='list_sport'>
				<h3 className="card_title">
					<span className='span_title'>Дата (ДД.ММ.ГГ)</span>
					<span className='span_title'>Пройдено км</span>
					<span className='span_title'>Действия</span>
				</h3>
				<ul className='border_ul'>
					{lists}
				</ul>
			</div>
		</>
	);
}