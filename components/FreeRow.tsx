"use client";

import { TimeSlotContext, useMeetingsContext } from "@/hooks/context";
import { useState } from "react";
import FreeRowDialog from "./FreeRowDialog";

interface FreeRowProps {
	time: number;
	room: string;
}

function FreeRow({ time, room }: FreeRowProps) {
	const [open, setOpen] = useState(false);
	const [hover, setHover] = useState(false);
	
	const meetings = useMeetingsContext();
	const hour = Math.floor(time / 4) + 7;
	const minute = (time % 4) * 15;
	const timeStr = hour.toString().padStart(2, "0") + ":" + minute.toString().padStart(2, "0");


	const handleClick = () => {
		setOpen(!open);
		setHover(false);
	};

	function onHover(hour: number, minute: number) {
        return (
            <p className="cursor-pointer" onClick={handleClick}>Start: {hour.toString().padStart(2, "0")}:{minute.toString().padStart(2, "0")}</p>
        );
    }

	return (
		<td onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
			{hover ? onHover(hour, minute) : ""}
			<TimeSlotContext.Provider value={timeStr}>
				<FreeRowDialog rowRoom={room} isOpen={open} handleClick={handleClick} />
			</TimeSlotContext.Provider>
		</td>
	);
}

export default FreeRow;
