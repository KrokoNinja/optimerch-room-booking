import { calcMeetingLength } from "@/hooks/calcMeetingLength";
import { Button } from "@mui/material";

interface MeetingButtonsProps {
	meeting: {
		startHour: number;
		startMinute: number;
		endHour: number;
		endMinute: number;
		room: string;
	};
	time: number;
}

function MeetingButtons({ meeting, time }: MeetingButtonsProps) {
	const length = calcMeetingLength(
		meeting.startHour,
		meeting.startMinute,
		meeting.endHour,
		meeting.endMinute
	);
	const meetingLenght = new Array(length).fill("");
	time = time / 60;
	const hour = Math.floor(time);
	const minute = (time - hour) * 60;

	return (
		<>
			{meetingLenght.map((meeting, index) => {
				meetingLenght[index] = hour.toString().padStart(2, "0");
				return (
					<Button key={meetingLenght[meeting]} disabled>
						{meetingLenght[meeting]}
					</Button>
				);
			})}
		</>
	);
}

export default MeetingButtons;
