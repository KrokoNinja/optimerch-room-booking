"use client";
import { deleteMeeting } from "@/hooks/deleteMeeting";
import getUpdate from "@/hooks/getUpdate";
import { SingleMeeting } from "@/types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface FormDialogProps {
	handleClose: () => void;
	open: boolean;
	room: string;
    meeting: SingleMeeting;
}

export default function DeleteDialog({ handleClose, open, room, meeting }: FormDialogProps) {

	const handleDelete = async () => {
		const error = await deleteMeeting(meeting);
        if (error) {
            console.log(error);
        }
        getUpdate(true);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Delete Meeting</DialogTitle>
				<DialogContent>
					<p>Are you sure you want to delete this meeting?</p>
                    <p>Room: {room}</p>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleDelete} className="text-red-500">Delete</Button>
				</DialogActions>
			</Dialog>
	);
}
