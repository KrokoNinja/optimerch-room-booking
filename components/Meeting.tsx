"use client";
import { calcMeetingLength } from "@/hooks/calcMeetingLength";
import { deleteMeeting } from "@/hooks/deleteMeeting";
import { SingleMeeting } from "@/types";

interface MeetingProps {
	meeting: SingleMeeting;
}

const handleMeetingClick = async (meeting : SingleMeeting) => {
	//TODO: Show DeleteDialog on click to have the user confirm that he wants to delete the meeting
	const error = await deleteMeeting(meeting);
	console.log("Id to delete: " + meeting.id);
	if (error) {
		console.log(error);
	}
	//window.location.reload();
};

function Meeting({ meeting }: MeetingProps) {
	let meetingsLenght = calcMeetingLength(
		meeting.startHour,
		meeting.startMinute,
		meeting.endHour,
		meeting.endMinute
	);

	return (
		<td
			className="bg-red-400 rounded-md cursor-pointer"
			rowSpan={meetingsLenght}
			onClick={() => handleMeetingClick(meeting)}
		>
			Meeting <br />
			{meeting.startHour}:{meeting.startMinute.toString().padStart(2, "0")} - {meeting.endHour}:
			{meeting.endMinute.toString().padStart(2, "0")}
		</td>
	);
}

export default Meeting;
