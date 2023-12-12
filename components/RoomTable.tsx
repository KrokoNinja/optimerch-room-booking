import { calcMeetingLength } from "@/hooks/calcMeetingLength";
import Meeting from "./Meeting";
import FreeRow from "./FreeRow";
import { useMeetingsContext } from "@/hooks/context";

interface RoomTableProps {
	room: string;
}

function RoomTable({ room }: RoomTableProps) {
	const meetings = useMeetingsContext();
	const tableRows = new Array(44).fill("");
	const roomMeetings = meetings.filter((meeting) => meeting.room === room);

	tableRows.map((_, index) => {
		const hour = Math.floor(index / 4) + 7;
		const minute = (index % 4) * 15;
		if (roomMeetings) {
			for (let i = 0; i < roomMeetings.length; i++) {
				if (hour + minute === roomMeetings[i].startHour + roomMeetings[i].startMinute) {
					tableRows[index] = roomMeetings[i];
					let meetingsLenght = calcMeetingLength(
						roomMeetings[i].startHour,
						roomMeetings[i].startMinute,
						roomMeetings[i].endHour,
						roomMeetings[i].endMinute
					);
					for (let i = 1; i < meetingsLenght; i++) {
						tableRows[index + i] = "meeting";
					}
				}
			}
		}
	});

	return (
		<table className="w-full text-center bg-slate-600">
			<thead className="border-b">
				<tr>
					<th>{room.charAt(0).toUpperCase() + room.substring(1)}</th>
				</tr>
			</thead>
			<tbody>
				{Array.from({ length: 44 }).map((_, index) => {
					return (
						<tr key={index} className="border-y last:border-none">
							{tableRows[index] !== "" && tableRows[index] !== "meeting" ? (
								<Meeting meeting={tableRows[index]} />
							) : tableRows[index] === "meeting" ? (
								<></>
							) : (
								<FreeRow time={index} />
							)}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default RoomTable;
