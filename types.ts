export type Meetings =
	| SingleMeeting[]
	| undefined;

export type SingleMeeting = {
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    room: string;
    id: number;
};