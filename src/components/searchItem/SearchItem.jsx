import './searchItem.css'
import { Link } from 'react-router-dom'

const SearchItem = ({ item, date }) => {
	return (
		<div className='searchItem'>
			<img
				src='https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1'
				alt=''
				className='siImg'
			/>
			<div className='siDesc'>
				<h1 className='siTitle'>{item.name}</h1>
				<span className='siDistance'>{item.distance[0]} m</span>
				<span className='siTaxiOp'>Free airport taxi</span>
				<span className='siSubtitle'>
					Studio Apartment with Air conditioning
				</span>
				<span className='siFeatures'>
					Entire studio • 1 bathroom • 21m² 1 full bed
				</span>
				<span className='siCancelOp'>Free cancellation </span>
				<span className='siCancelOpSubtitle'>
					You can cancel later, so lock in this great price today!
				</span>
			</div>
			<div className='siDetails'>
				<div className='siRating'>
					<span>Excellent</span>
					<button>{item.rating || 9}</button>
				</div>
				<div className='siDetailTexts'>
					<span className='siPrice'>${item.cheapestPrice}</span>
					<span className='siTaxOp'>Includes taxes and fees</span>
					<Link to={`/hotels/${item._id}`} state={{ item: item, date: date }}>
						<button className='siCheckButton'>See availability</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default SearchItem
