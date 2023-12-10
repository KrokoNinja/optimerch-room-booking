"use client";
import { calcMeetingLength } from "@/hooks/calcMeetingLength";

interface MeetingProps {
	meeting: {
		startHour: number;
		startMinute: number;
		endHour: number;
		endMinute: number;
		room: string;
	};
}

const handleMeetingClick = () => {
	console.log("click");
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
			onClick={() => handleMeetingClick()}
		>
			Meeting <br />
			{meeting.startHour}:{meeting.startMinute.toString().padStart(2, "0")} - {meeting.endHour}:
			{meeting.endMinute.toString().padStart(2, "0")}
		</td>
	);
}

export default Meeting;
