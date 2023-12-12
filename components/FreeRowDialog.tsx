"use client";
import { Fragment, useState } from "react";
import FormDialog from "./FormDialog";

interface FormDialogProps {
    rowRoom: string;
    isOpen: boolean;
    handleClick: () => void;
}

export default function FreeRowDialog({ rowRoom, isOpen, handleClick }: FormDialogProps) {
	const [room, setRoom] = useState(rowRoom);

	const changeRoom = (room: string) => {
		setRoom(room);
	};

	return (
		<Fragment>
			<FormDialog open={isOpen} handleClose={handleClick} changeRoom={changeRoom} room={room} />
		</Fragment>
	);
}
