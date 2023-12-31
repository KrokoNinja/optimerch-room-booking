"use client";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import TimeSlotGrid from "./TimeSlotGrid";
import { useState } from "react";
import { createMeeting } from "@/hooks/createMeeting";
import getUpdate from "@/hooks/getUpdate";

interface FormDialogProps {
	handleClose: () => void;
	open: boolean;
	changeRoom: (room: string) => void;
	room: string;
}

export default function FormDialog({ handleClose, open, changeRoom, room }: FormDialogProps) {

	const [selected, setSelected] = useState("");
	const [endSelected, setEndSelected] = useState("");

	const handleSelected = (time: string) => {
		setSelected(time);
	};

	const handleSave = async (start : string, end : string, room : string) => {
		const startDate = new Date();
		const endDate = new Date();
		const startHour = parseInt(start.split(":")[0]);
		const startMinute = parseInt(start.split(":")[1]);
		const endHour = parseInt(end.split(":")[0]);
		const endMinute = parseInt(end.split(":")[1]);
		startDate.setHours(startHour, startMinute);
		endDate.setHours(endHour, endMinute);
		const error = await createMeeting(startDate, endDate, room);
		if (error) {
			alert(error.message);
		}
		handleClose();
		getUpdate(true);
		setSelected("");
		setEndSelected("");
	};

	const save = () => {
		handleSave(selected, endSelected, room);
	}

	const onRoomChange = (e: SelectChangeEvent<string>) => {
		changeRoom(e.target.value as string);
		setSelected("");
		setEndSelected("");
	}

	return (
		<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Create New Meeting</DialogTitle>
				<DialogContent>
					<FormControl required sx={{ m: 1, minWidth: 240 }}>
						<InputLabel id="demo-simple-select-required-label">Room</InputLabel>
						<Select
							labelId="demo-simple-select-required-label"
							id="demo-simple-select-required"
							value={room}
							label="Room *"
							onChange={(e) => onRoomChange(e)}
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
					{room ? <TimeSlotGrid room={room} handleSelected={handleSelected} selected={selected} endSelected={endSelected} setEndSelected={setEndSelected} /> : <div></div>}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={save}>Save</Button>
				</DialogActions>
			</Dialog>
	);
}
