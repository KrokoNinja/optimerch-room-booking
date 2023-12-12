"use client";

import { calcMeetingLength } from "@/hooks/calcMeetingLength";
import { Button } from "@mui/material";
import { useMeetingsContext } from "@/hooks/context";

interface TimeSlotGridProps {
	room: string;
}

function TimeSlotGrid({ room }: TimeSlotGridProps) {
	const meetings = useMeetingsContext();
	const buttons = new Array(44).fill("");
	const roomMeetings = meetings.filter((meeting) => meeting.room === room);

	buttons.map((_, index) => {
		const hour = Math.floor(index / 4) + 7;
		const minute = (index % 4) * 15;
		if (roomMeetings) {
			for (let i = 0; i < roomMeetings.length; i++) {
				if (hour + minute === roomMeetings[i].startHour + roomMeetings[i].startMinute) {
					buttons[index] = roomMeetings[i];
					let meetingsLenght = calcMeetingLength(
						roomMeetings[i].startHour,
						roomMeetings[i].startMinute,
						roomMeetings[i].endHour,
						roomMeetings[i].endMinute
					);
					for (let i = 1; i < meetingsLenght; i++) {
						buttons[index + i] = "meeting";
					}
				}
			}
		}
	});

	return (
		<div className="grid grid-cols-8">
			{Array.from({ length: 44 }).map((_, index) => {
				const hour = Math.floor(index / 4) + 7;
				const minute = (index % 4) * 15;
				const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
				return (
					<Button key={time} disabled={buttons[index] !== ""}>{time}</Button>
				);
			})}
		</div>
	);
}

export default TimeSlotGrid;
