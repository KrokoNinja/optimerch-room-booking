"use client";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import TimeSlotGrid from "./TimeSlotGrid";

interface FormDialogProps {
	handleClose: () => void;
	open: boolean;
	changeRoom: (room: string) => void;
	room: string;
}

export default function FormDialog({ handleClose, open, changeRoom, room }: FormDialogProps) {
	return (
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
					{room ? <TimeSlotGrid room={room} /> : <div></div>}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClose}>Subscribe</Button>
				</DialogActions>
			</Dialog>
	);
}
