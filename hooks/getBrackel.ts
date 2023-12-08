import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export async function getBrackel() {
	const { data } = await supabase.from("brackel").select();
	const meetingsBrackel = data?.map((meeting) => {
		return {
			startHour: new Date(meeting.start).getHours(),
			startMinute: new Date(meeting.start).getMinutes(),
			endHour: new Date(meeting.end).getHours(),
			endMinute: new Date(meeting.end).getMinutes(),
		};
	}, []);

	return meetingsBrackel;
}
