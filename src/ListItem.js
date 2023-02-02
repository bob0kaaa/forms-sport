import React from 'react';
import PropTypes from 'prop-types';

function ListItem({ item }) {
	let price_tag = '';
	let quant_color = item.quantity;
	console.log('props---', item.price, item.MainImage, '\n item--', item);

	if (item.state !== 'active') {
		return null;
	}

	switch (`${item.currency_code}`) {
		case 'USD':
			price_tag = `$${item.price}`;
			break;
		case 'EUR':
			price_tag = `€${item.price}`;
			break;
		default:
			price_tag = `${item.price} ${item.currency_code}`;
	}

	if (item.quantity < 10) {
		quant_color = 'level-low';
	}
	else if (item.quantity <= 20) {
		quant_color = 'level-medium';
	} else {
		quant_color = 'level-high';
	}

	return (
		<div className='item'>
			<div className='item-image'>
				<a href={item.url}>
					<img src={item.MainImage.url_570xN} alt={item.title} />
				</a>
			</div>
			<div className='item-details'>
				<p className='item-title'>{item.title.length < 50 ? item.title : item.title.slice(0, 50) + '...'}</p>
				<p className='item-price'>{price_tag}</p>
				<p className={`item-quantity ${quant_color}`}>{item.quantity} left</p>
			</div>
		</div>
	)
}

ListItem.propTypes = {
	item: PropTypes.shape({
		url: PropTypes.string,
		MainImage: PropTypes.object,
		title: PropTypes.string,
		currency_code: PropTypes.string,
		price: PropTypes.string,
		quantity: PropTypes.number,
		listing_id: PropTypes.number,
	})
}

export default ListItem;