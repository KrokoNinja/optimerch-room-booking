export function getSpan(start: Date, end: Date) {
	const startHour = start.getHours();
	const startMinute = start.getMinutes();
	const endHour = end.getHours();
	const endMinute = end.getMinutes();
	return (endHour - startHour) * 4 + (endMinute - startMinute) / 15;
}
