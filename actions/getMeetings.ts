"use server"
import { getData } from "@/hooks/getData";
import { Meetings } from "@/types";

export async function getMeetings() {
    const meetings = await getData();
    return meetings as Meetings;
}