"use client";
import { MeetingsContext } from "@/hooks/context"
import TimeTable from "./TimeTable";
import RoomTable from "./RoomTable";
import { useEffect, useState } from "react";
import { Meetings } from "@/types";
import { getMeetings } from "@/actions/getMeetings";
import NewMeetingDialog from "./NewMeetingDialog";

function RoomBooking() {

    const [meetings, setMeetings] = useState([] as Meetings);

 useEffect(() => {
    async function fetchMeetings() {
        const meetings = await getMeetings();
        setMeetings(meetings);
    }
    fetchMeetings();
 }, [])

  return (
    <MeetingsContext.Provider value={meetings}>
        <NewMeetingDialog />
        <div className="flex w-full max-w-5xl">
            <TimeTable />
            <RoomTable room="aplerbeck" />
            <RoomTable room="hoerde" />
            <RoomTable room="brackel" />
        </div>
    </MeetingsContext.Provider>
  )
}

export default RoomBooking