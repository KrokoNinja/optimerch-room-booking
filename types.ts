export type Meetings =
	| singleMeeting[]
	| undefined;

export type singleMeeting = {
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    room: string;
};