import { Meetings } from "@/types";
import { createContext, useContext } from "react";

export const MeetingsContext = createContext<Meetings | undefined>(undefined);
export const TimeSlotContext = createContext<string | undefined>(undefined);

export const useMeetingsContext = () => { 
    const context = useContext(MeetingsContext);
    if (context === undefined) {
        throw new Error("useMeetingsContext must be used within a MeetingsProvider");
    }
    return context;
}

export const useTimeSlotContext = () => { 
    const context = useContext(TimeSlotContext);
    if (context === undefined) {
        throw new Error("useTimeSlotContext must be used within a TimeSlotProvider");
    }
    return context;
}