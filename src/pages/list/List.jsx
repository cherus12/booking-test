import './list.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'
import axios from 'axios'

const List = () => {
	const location = useLocation()
	const [destination, setDestination] = useState(location.state.destination)
	const [date, setDate] = useState(location.state.date)
	const [openDate, setOpenDate] = useState(false)
	const [options, setOptions] = useState(location.state.options)

	const [isSearch, setIsSearch] = useState(false)

	const [data, setData] = useState([])

	useEffect(() => {
		const fetch = async () => {
			try {
				const res = await axios.get(
					`https://booking-test-server.onrender.com/hotels?city=${destination}`
				)
				setData(res.data)
			} catch (err) {
				console.log(err)
			}
		}

		if (isSearch) {
			fetch()
			setIsSearch(false)
		}

		fetch()
	}, [isSearch])

	console.log(data, 'data')

	return (
		<div>
			<Navbar />
			<Header type='list' />
			<div className='listContainer'>
				<div className='listWrapper'>
					<div className='listSearch'>
						<h1 className='lsTitle'>Search</h1>
						<div className='lsItem'>
							<label>Destination</label>
							<input
								placeholder={destination}
								type='text'
								onChange={e => setDestination(e.target.value)}
							/>
						</div>
						<div className='lsItem'>
							<label>Check-in Date</label>
							<span onClick={() => setOpenDate(!openDate)}>{`${format(
								date[0].startDate,
								'MM/dd/yyyy'
							)} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}</span>
							{openDate && (
								<DateRange
									onChange={item => setDate([item.selection])}
									minDate={new Date()}
									ranges={date}
								/>
							)}
						</div>
						<div className='lsItem'>
							<label>Options</label>
							<div className='lsOptions'>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>
										Min price <small>per night</small>
									</span>
									<input type='number' className='lsOptionInput' />
								</div>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>
										Max price <small>per night</small>
									</span>
									<input type='number' className='lsOptionInput' />
								</div>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>Adult</span>
									<input
										type='number'
										min={1}
										className='lsOptionInput'
										placeholder={options.adult}
									/>
								</div>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>Children</span>
									<input
										type='number'
										min={0}
										className='lsOptionInput'
										placeholder={options.children}
									/>
								</div>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>Room</span>
									<input
										type='number'
										min={1}
										className='lsOptionInput'
										placeholder={options.room}
									/>
								</div>
							</div>
						</div>
						<button onClick={() => setIsSearch(true)}>Search</button>
					</div>
					<div className='listResult'>
						{/* <SearchItem /> */}
						{data &&
							data.map(item => (
								<SearchItem item={item} date={date} key={item._id}></SearchItem>
							))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default List
