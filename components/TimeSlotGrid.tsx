"use client";

import { calcMeetingLength } from "@/hooks/calcMeetingLength";
import { Button } from "@mui/material";
import MeetingButtons from "./MeetingButtons";
import { Meetings } from "@/types";
import { useMeetingsContext } from "@/hooks/context";

interface TimeSlotGridProps {
	meetingslots: Meetings;
	room: string;
}

function TimeSlotGrid({ meetingslots, room }: TimeSlotGridProps) {
	const meetings = useMeetingsContext();

	return (
		<div className="grid grid-cols-8">
			{Array.from({ length: 44 }).map((_, index) => {
				let hour = Math.floor(index / 4) + 7;
				let minute = (index % 4) * 15;
				let time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
				const meeting = meetings?.find((meeting) => {
					return meeting.room === room && meeting.startHour === hour && meeting.startMinute === minute;
				});
				if (meeting) {
					const meetingLength = calcMeetingLength(meeting.startHour, meeting.startMinute, meeting.endHour, meeting.endMinute);
					index += meetingLength - 1;
					return Array.from({ length: meetingLength }).map((_, i) => (
						<Button key={time} disabled>
							{time}
						</Button>
					));
				} else {
					return (
						<Button key={time}>
							{time}
						</Button>
					);
				}
			})}
		</div>
	);
}

export default TimeSlotGrid;
