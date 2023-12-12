"use client";
import { MeetingsContext } from "@/hooks/context"
import FormDialog from "./FormDialog";
import TimeTable from "./TimeTable";
import RoomTable from "./RoomTable";
import { useEffect, useState } from "react";
import { Meetings } from "@/types";
import { getMeetings } from "@/actions/getMeetings";

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
        <FormDialog meetings={meetings} />
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