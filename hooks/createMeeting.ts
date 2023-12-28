"use server"
import { SingleMeeting } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getUser from "./getUser";

const cookieStore = cookies();
const supabase = createClient(cookieStore);
const user_id = getUser();

export async function createMeeting(start : Date, end : Date, room : string) {
	const {error} = await supabase.from("rooms").insert([
        { start: start, end: end, room: room, user_id: user_id }]);
	return error;
}

export async function redirectToLogin() {
    return redirect("/login");
}
