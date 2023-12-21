"use client";
import Button from "@mui/material/Button";
import { Fragment, useState } from "react";
import FormDialog from "./FormDialog";
import { TimeSlotContext } from "@/hooks/context";
import getUser from "@/hooks/getUser";
import { redirectToLogin } from "@/hooks/createMeeting";

export default function NewMeetingDialog() {
	const [open, setOpen] = useState(false);
	const [room, setRoom] = useState("");

	const handleClickOpen = async () => {
		const user = await getUser();
		user ? setOpen(true) : redirectToLogin();
	};

	const handleClose = () => {
		setOpen(false);
		setRoom("");
	};

	const changeRoom = (room: string) => {
		setRoom(room);
	};

	return (
		<Fragment>
			<div className="fixed bottom-10 right-10">
				<Button variant="outlined" onClick={handleClickOpen}>
					New Meeting
				</Button>
			</div>
			<TimeSlotContext.Provider value={""}>
				<FormDialog open={open} handleClose={handleClose} changeRoom={changeRoom} room={room} />
			</TimeSlotContext.Provider>
		</Fragment>
	);
}
