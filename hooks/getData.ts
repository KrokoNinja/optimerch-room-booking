import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export async function getData() {
    const { data } = await supabase.from("rooms").select().order("start", { ascending: true });
	const meetings = data?.map((meeting) => {
		return {
			startHour: new Date(meeting.start).getHours(),
			startMinute: new Date(meeting.start).getMinutes(),
			endHour: new Date(meeting.end).getHours(),
			endMinute: new Date(meeting.end).getMinutes(),
			room: meeting.room,
			id: meeting.id,
			user: meeting.user,
		};
	}, []);

	return meetings;
}