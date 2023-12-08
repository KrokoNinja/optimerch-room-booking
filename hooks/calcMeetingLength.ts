interface Meeting {
	startHour: number;
	startMinute: number;
	endHour: number;
	endMinute: number;
	room: string;
}

export function calcMeetingLength(meeting: Meeting) {
	const meetingLength =
		meeting.endHour * 60 + meeting.endMinute - (meeting.startHour * 60 + meeting.startMinute);
	return meetingLength / 15;
}
