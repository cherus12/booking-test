import './hotel.css'
import Navbar from '../../components/navbar/Navbar'
import Header, { DateContext } from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCircleArrowLeft,
	faCircleArrowRight,
	faCircleXmark,
	faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Reserve from '../../components/reserve/Reserve'

const Hotel = () => {
	const [slideNumber, setSlideNumber] = useState(0)
	const [open, setOpen] = useState(false)

	const [openModal, setOpenModal] = useState(false)

	const location = useLocation()
	const state = location.state.item
	const date = location.state.date

	const startDate = date[0].startDate
	const endDate = date[0].endDate

	const days =
		(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1

	const time = new Date()

	// console.log(time, 'time')

	// console.log(days, 'date')

	const photos = [
		{
			src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1',
		},
		{
			src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1',
		},
		{
			src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1',
		},
		{
			src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1',
		},
		{
			src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1',
		},
		{
			src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1',
		},
	]

	const handleOpen = i => {
		setSlideNumber(i)
		setOpen(true)
	}

	const handleMove = direction => {
		let newSlideNumber

		if (direction === 'l') {
			newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
		} else {
			newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
		}

		setSlideNumber(newSlideNumber)
	}

	// console.log(state, 'state')

	return (
		<div>
			<Navbar />
			<Header type='list' />
			<div className='hotelContainer'>
				{open && (
					<div className='slider'>
						<FontAwesomeIcon
							icon={faCircleXmark}
							className='close'
							onClick={() => setOpen(false)}
						/>
						<FontAwesomeIcon
							icon={faCircleArrowLeft}
							className='arrow'
							onClick={() => handleMove('l')}
						/>
						<div className='sliderWrapper'>
							<img src={photos[slideNumber].src} alt='' className='sliderImg' />
						</div>
						<FontAwesomeIcon
							icon={faCircleArrowRight}
							className='arrow'
							onClick={() => handleMove('r')}
						/>
					</div>
				)}
				<div className='hotelWrapper'>
					<button className='bookNow' onClick={() => setOpenModal(true)}>
						Reserve or Book Now!
					</button>
					<h1 className='hotelTitle'>{state.title}</h1>
					<div className='hotelAddress'>
						<FontAwesomeIcon icon={faLocationDot} />
						<span>{state.address}</span>
					</div>
					<span className='hotelDistance'>
						Excellent location – {state.distance}m from center
					</span>
					<span className='hotelPriceHighlight'>
						Book a stay over $114 at this property and get a free airport taxi
					</span>
					<div className='hotelImages'>
						{photos.map((photo, i) => (
							<div className='hotelImgWrapper' key={i}>
								<img
									onClick={() => handleOpen(i)}
									src={photo.src}
									alt=''
									className='hotelImg'
								/>
							</div>
						))}
					</div>
					<div className='hotelDetails'>
						<div className='hotelDetailsTexts'>
							<h1 className='hotelTitle'>Stay in the heart of City</h1>
							<p className='hotelDesc'>{state.desc}</p>
						</div>
						<div className='hotelDetailsPrice'>
							<h1>Perfect for a {days}-night stay!</h1>
							<span>
								Located in the real heart of Krakow, this property has an
								excellent location score of 9.8!
							</span>
							<h2>
								<b>${state.cheapestPrice * days}</b> ({days} nights, $
								{state.cheapestPrice} per day )
							</h2>
							<button>Reserve or Book Now!</button>
						</div>
					</div>
				</div>
				{openModal && (
					<Reserve
						setOpenModal={setOpenModal}
						item={state}
						startDate={startDate}
						endDate={endDate}
					></Reserve>
				)}

				<MailList />
				<Footer />
			</div>
		</div>
	)
}

export default Hotel
