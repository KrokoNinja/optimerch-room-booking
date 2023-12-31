"use client";

import { calcMeetingLength } from "@/hooks/calcMeetingLength";
import { Button } from "@mui/material";
import { useMeetingsContext, useTimeSlotContext } from "@/hooks/context";
import { Dispatch, SetStateAction, useEffect } from "react";

interface TimeSlotGridProps {
	room: string;
	handleSelected: (time: string) => void;
	selected: string;
	endSelected: string;
	setEndSelected: Dispatch<SetStateAction<string>>
}

function TimeSlotGrid({ room, handleSelected, selected, endSelected, setEndSelected }: TimeSlotGridProps) {
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
	if (selected && endSelected) {
		return (
			<>
				<div className="flex flex-row items-center justify-between gap-3">
					<p>Start of Meeting: </p>
					<Button variant="outlined" onClick={() => handleSelected("")}>{selected}</Button>
				</div>
				<div className="flex flex-row items-center justify-between gap-3">
					<p>End of Meeting: </p>
					<Button variant="outlined" onClick={() => setEndSelected("")}>{endSelected}</Button>
				</div>
			</>
		)
	}
	else if (selected) {
		let hour = parseInt(selected.split(":")[0]);
		let minute = parseInt(selected.split(":")[1]);
		const buttonIndex = (hour - 7) * 4 + minute / 15;
		const meetingAfterIndex = buttons.findIndex((button, index) => index > buttonIndex && button !== "" && button !== "meeting");
		const availableSlots = meetingAfterIndex === -1 ? 44 - buttonIndex : meetingAfterIndex - buttonIndex;
		return (
			<>
				<div className="flex flex-row items-center gap-3">
					<p>Start of Meeting: </p>
					<Button variant="outlined" onClick={() => handleSelected("")}>{selected}</Button>
				</div>
				<p>Select End of Meeting</p>
				<div className="grid grid-cols-8">
					{
						Array.from({ length: availableSlots }).map((_, index) => {
							minute += 15;
							if (minute === 60) {
								minute = 0;
								hour++;
							}
							const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
							if (availableSlots === 1) {
								const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
								minute += 15;
								if (minute === 60) {
									minute = 0;
									hour++;
								}
								setEndSelected(time);
							}
							else if (time !== selected) {
								return (
									<Button key={time} variant="outlined" onClick={() => setEndSelected(time)}>{time}</Button>
								);
							}
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
