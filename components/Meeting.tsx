"use client";
import { calcMeetingLength } from "@/hooks/calcMeetingLength";
import { SingleMeeting } from "@/types";
import DeleteDialog from "./DeleteDialog";
import { useState } from "react";
import getUser from "@/hooks/getUser";
import { redirectToLogin } from "@/hooks/createMeeting";

interface MeetingProps {
	meeting: SingleMeeting;
}

function Meeting({ meeting }: MeetingProps) {

	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	}

	const handleOpen = async () => {
		const user = await getUser();
		if (user) {
			user == meeting.user ? setOpen(true) : alert("You can't delete a meeting you didn't create");
		} else {
			redirectToLogin();
		}
	}

	let meetingsLenght = calcMeetingLength(
		meeting.startHour,
		meeting.startMinute,
		meeting.endHour,
		meeting.endMinute
	);

	return (
		<>
			<td
				className="bg-red-400 rounded-md cursor-pointer"
				rowSpan={meetingsLenght}
				onClick={handleOpen}
			>
				Meeting {meetingsLenght > 1 ? <br /> : ""}
				{meeting.startHour}:{meeting.startMinute.toString().padStart(2, "0")} - {meeting.endHour}:
				{meeting.endMinute.toString().padStart(2, "0")}
			</td>
			<DeleteDialog room={meeting.room} handleClose={handleClose} open={open} meeting={meeting} />
		</>
	);
}

export default Meeting;
