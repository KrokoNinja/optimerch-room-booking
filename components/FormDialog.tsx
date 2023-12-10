"use client";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Fragment, useState } from "react";
import { FormControl, FormHelperText, InputLabel, Menu, MenuItem, Select } from "@mui/material";
import TimeSlotGrid from "./TimeSlotGrid";
import { Meetings } from "@/types";

interface FormDialogProps {
	meetings: Meetings;
}

export default function FormDialog({ meetings }: FormDialogProps) {
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
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Create New Meeting</DialogTitle>
				<DialogContent>
					<FormControl required sx={{ m: 1, minWidth: 120 }}>
						<InputLabel id="demo-simple-select-required-label">Room</InputLabel>
						<Select
							labelId="demo-simple-select-required-label"
							id="demo-simple-select-required"
							value={room}
							label="Room *"
							onChange={(e) => changeRoom(e.target.value)}
						>
							<MenuItem value="">
								<em>Select Room</em>
							</MenuItem>
							<MenuItem value={"aplerbeck"}>Aplerbeck</MenuItem>
							<MenuItem value={"hoerde"}>Hörde</MenuItem>
							<MenuItem value={"brackel"}>Brackel</MenuItem>
						</Select>
						<FormHelperText>Required</FormHelperText>
					</FormControl>
					{room ? <TimeSlotGrid meetingslots={timeSlots} /> : <div></div>}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClose}>Subscribe</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}
