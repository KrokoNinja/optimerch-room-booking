"use server"
import { SingleMeeting } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export async function deleteMeeting( meeting : SingleMeeting ) {
	const {error} = await supabase.from("rooms").delete().eq("id", meeting.id.toString());
	return error;
}
