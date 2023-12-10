export function calcMeetingLength(
	startHour: number,
	startMinute: number,
	endHour: number,
	endMinute: number
) {
	const meetingLength = endHour * 60 + endMinute - (startHour * 60 + startMinute);
	return meetingLength / 15;
}
