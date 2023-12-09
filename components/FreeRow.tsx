"use client";

import { useState } from "react";

interface FreeRowProps {
	time: number;
}

function onHover(hour: number, minute: number) {
	return (
		<p className="bg-slate-200 rounded-md text-black cursor-default">
			Start: {hour.toString().padStart(2, "0")}:{minute.toString().padStart(2, "0")}
		</p>
	);
}

function FreeRow({ time }: FreeRowProps) {
	const hour = Math.floor(time / 4) + 7;
	const minute = (time % 4) * 15;

	const [hover, setHover] = useState(false);

	return (
		<td onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
			{hover ? onHover(hour, minute) : ""}
		</td>
	);
}

export default FreeRow;
