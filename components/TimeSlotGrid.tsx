"use client";

import { calcMeetingLength } from "@/hooks/calcMeetingLength";
import { Button } from "@mui/material";
import MeetingButtons from "./MeetingButtons";

interface TimeSlotGridProps {
	meetingslots: Meeting;
}

type Meeting =
	| {
			startHour: number;
			startMinute: number;
			endHour: number;
			endMinute: number;
			room: string;
	  }[]
	| undefined;

function TimeSlotGrid({ meetingslots }: TimeSlotGridProps) {
	//TODO: Add meeting length so that all buttons are disabled inside the meetings length
	return (
		<div className="grid grid-cols-8">
			{Array.from({ length: 44 }).map((_, index) => {
				const hour = Math.floor(index / 4) + 7;
				const minute = (index % 4) * 15;
				const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
				const free = meetingslots?.filter((meeting) => {
					return meeting.startHour == hour && meeting.startMinute == minute;
				});
				if (free && free.length > 0) {
					index += calcMeetingLength(
						free[0].startHour,
						free[0].startMinute,
						free[0].endHour,
						free[0].endMinute
					);
					return <MeetingButtons key={time} meeting={free[0]} time={hour * 60 + minute} />;
				} else {
					return <Button key={time}>{time}</Button>;
				}
			})}
		</div>
	);
}

export default TimeSlotGrid;
