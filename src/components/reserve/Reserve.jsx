// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import { useEffect, useState } from 'react'
import axios from 'axios'

import './reserve.css'

const Reserve = ({
	setOpen,
	hotelId,
	setOpenModal,
	item,
	startDate,
	endDate,
}) => {
	const [data, setData] = useState([])
	const [dates, setDates] = useState(null)

	const [checked, setChecked] = useState([])

	startDate = new Date(startDate).getTime()
	endDate = new Date(endDate).getTime()

	const allDates = [startDate, endDate]

	useEffect(() => {
		const fetch = async () => {
			const res = await axios.get(`http://localhost:8800/hotels/${item._id}`)
			setData(res.data)
		}

		fetch()
	}, [])

	const handleChecked = (room, e) => {
		const isChecked = e.target.checked

		setChecked(
			isChecked ? [...checked, room] : checked.filter(item => item !== room)
		)
	}

	const handleClick = async () => {
		await axios.put(`http://localhost:8800/rooms/reserve`, {
			date: allDates,
			checked,
		})
	}

	const isAvailable = room => {
		const isFound = room.unavailableDates.some(date => {
			const unavailableDate = new Date(date).getTime()
			return allDates.includes(unavailableDate)
		})
		return isFound
	}

	console.log(data, 'data')

	return (
		<>
			<div className='reserve'>
				<div className='rContainer'>
					<span>Select your rooms:</span>
					<p className='close' onClick={() => setOpenModal(false)}>
						CLOSE
					</p>

					{data &&
						data.map(item => (
							<div className='rItem'>
								<div className='rItemInfo'>
									<div className='rTitle'>{item.title}</div>
									<div className='rDesc'>{item.desc}</div>
									<div className='rMax'>
										Max people: <b>{item.maxPeople}</b>
									</div>
									<div className='rPrice'>{item.price}</div>
								</div>
								<div className='rSelectRooms'>
									{item.roomNumbers.map(roomNumber => (
										<div className='room'>
											<label>{roomNumber.number}</label>
											<input
												type='checkbox'
												value={roomNumber.number}
												onChange={e => handleChecked(roomNumber._id, e)}
												disabled={isAvailable(roomNumber)}
											/>
										</div>
									))}
								</div>
							</div>
						))}

					<button className='rButton' onClick={handleClick}>
						Reserve Now!
					</button>
				</div>
			</div>
		</>
	)
}

export default Reserve
