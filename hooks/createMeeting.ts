"use server"
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getUser from "./getUser";
import { revalidatePath } from "next/cache";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export async function createMeeting(start : Date, end : Date, room : string) {
    const user_id = await getUser();
	const {error} = await supabase.from("rooms").insert([
        { start: start, end: end, room: room, user_id: user_id }]);
    if (!error) revalidatePath("/");
	return error;
}

export async function redirectToLogin() {
    return redirect("/login");
}
