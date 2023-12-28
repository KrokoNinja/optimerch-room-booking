"use client";

import { calcMeetingLength } from "@/hooks/calcMeetingLength";
import { Button } from "@mui/material";
import { useMeetingsContext, useTimeSlotContext } from "@/hooks/context";
import { useEffect } from "react";

interface TimeSlotGridProps {
	room: string;
	handleSelected: (time: string) => void;
	selected: string;
}

function TimeSlotGrid({ room, handleSelected, selected }: TimeSlotGridProps) {
	const meetings = useMeetingsContext();
	const timeSlot = useTimeSlotContext();
	const buttons = new Array(44).fill("");
	const roomMeetings = meetings.filter((meeting) => meeting.room === room);
	
	useEffect(() => {
		handleSelected(timeSlot);
	}, [timeSlot]);

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

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		handleSelected(e.currentTarget.textContent || "");
	}

	if (selected) {
		let hour = parseInt(selected.split(":")[0]);
		let minute = parseInt(selected.split(":")[1]);
		const buttonIndex = (hour - 7) * 4 + minute / 15;
		const meetingAfterIndex = buttons.findIndex((button, index) => index > buttonIndex && button !== "" && button !== "meeting");
		const availableSlots = meetingAfterIndex === -1 ? 44 - buttonIndex : meetingAfterIndex - buttonIndex;
		return (
			<>
				<p>Select End of Meeting</p>
				<div className="grid grid-cols-8" onClick={() => handleSelected("")}>
					{
						Array.from({ length: availableSlots }).map((_, index) => {
							const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
							minute += 15;
							if (minute === 60) {
								minute = 0;
								hour++;
							}
							return (
								<Button key={time} variant="outlined" className="first:bg-slate-600">{time}</Button>
							);
						})
					}
				</div>
			</>
		)
	}
	return (
		<>
			<p>Select Start of Meeting</p>
			<div className="grid grid-cols-8">
				{
					Array.from({ length: 44 }).map((_, index) => {
						const hour = Math.floor(index / 4) + 7;
						const minute = (index % 4) * 15;
						const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
						return (
							<Button key={time} disabled={buttons[index] !== ""} onClick={handleClick} variant="outlined">{time}</Button>
						);
					})
				}
			</div>
		</>
	);
}

export default TimeSlotGrid;
