
import React, { useEffect, useState } from "react";
import './Queue.css';
import appointmentService from "../../services/AppointmentService";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Button } from "@mui/material";

function Queue() {
	const handle = useFullScreenHandle();
	const [queue, setQueue] = useState([]);
	useEffect(() => {
		appointmentService.getQueue().then((result) => {
			setQueue(result);
		});
		const interval = setInterval(() => {
			appointmentService.getQueue().then((result) => {
				setQueue(result);
			});
		}, 60000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className='app-container-wrapper col-12'>
			<div className="col-6 offset-3 text-center">
				<Button variant="contained" className="w-50 mb-1" type="button" onClick={handle.enter}>
					Enter FullScreen
				</Button>
			</div>
			<FullScreen handle={handle} >
				{queue.map((q, idx) => {

					return (
						<div className={`app-container ${q.statusId === 2 ? 'in-progress' : 'waiting'}`} key={q.appointmentId}>
							<div >
								{`#${idx + 1}. ${q.year} ${q.make} ${q.model} - ${q.statusId === 2 ? 'Now servicing' : 'Waiting'}`}
							</div>
						</div>)
				})}
			</FullScreen>
		</div>
	);
}
export default Queue;
