"use server"
import { SingleMeeting } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface deleteMeetingProps {
    id: string;
    start: string;
    end: string;
    room: string;
}

const cookieStore = cookies();
const supabase = createClient(cookieStore);

/* export async function createMeeting(  ) {
	const {error} = await supabase.from("rooms").insert([
        { id: , start: , end: , room:  }});
	return error;
} */

export async function redirectToLogin() {
    return redirect("/login");
}
