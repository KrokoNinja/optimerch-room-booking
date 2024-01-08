"use client";

import { TimeSlotContext } from "@/hooks/context";
import { useState } from "react";
import FreeRowDialog from "./FreeRowDialog";
import getUser from "@/hooks/getUser";
import { redirectToLogin } from "@/hooks/createMeeting";

interface FreeRowProps {
	time: number;
	room: string;
}

function FreeRow({ time, room }: FreeRowProps) {
	const [open, setOpen] = useState(false);
	const [hover, setHover] = useState(false);
	const hour = Math.floor(time / 4) + 7;
	const minute = (time % 4) * 15;
	const timeStr = hour.toString().padStart(2, "0") + ":" + minute.toString().padStart(2, "0");


	const handleClick = async () => {
		const user = await getUser();
		user ? setOpen(!open) : redirectToLogin();
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
