"use client";
import Button from "@mui/material/Button";
import { Fragment, useState } from "react";
import { Meetings } from "@/types";
import FormDialog from "./FormDialog";

interface FormDialogProps {
	meetings: Meetings;
}

export default function NewMeetingDialog({ meetings }: FormDialogProps) {
	const [open, setOpen] = useState(false);
	const [room, setRoom] = useState("");
	const [timeSlots, setTimeSlots] = useState({} as Meetings);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setRoom("");
	};

	const filterMeetingsByRoom = (room: string) => {
		return meetings?.filter((meeting) => meeting.room == room);
	};

	const changeRoom = (room: string) => {
		setRoom(room);
		setTimeSlots(filterMeetingsByRoom(room));
	};

	return (
		<Fragment>
			<div className="fixed bottom-10 right-10">
				<Button variant="outlined" onClick={handleClickOpen}>
					New Meeting
				</Button>
			</div>
			<FormDialog open={open} handleClose={handleClose} changeRoom={changeRoom} room={room} />
		</Fragment>
	);
}
