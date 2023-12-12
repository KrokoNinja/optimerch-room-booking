import { calcMeetingLength } from "@/hooks/calcMeetingLength";
import { SingleMeeting } from "@/types";
import { Button } from "@mui/material";

interface MeetingButtonsProps {
	meetingLength: number;
	hour: number;
	minute: number;
}

function MeetingButtons({ meetingLength, hour, minute }: MeetingButtonsProps) {

	let time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

	return (
		<>
			return (
				{Array.from({ length: meetingLength }).map((_, i) => (
					<Button key={time} disabled>
						{time}
					</Button>
				))}
			);
		</>
	);
}

export default MeetingButtons;
