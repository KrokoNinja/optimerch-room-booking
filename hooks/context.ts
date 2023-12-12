import { Meetings } from "@/types";
import { createContext, useContext } from "react";

export const MeetingsContext = createContext<Meetings | undefined>(undefined);

export const useMeetingsContext = () => { 
    const context = useContext(MeetingsContext);
    if (context === undefined) {
        throw new Error("useMeetingsContext must be used within a MeetingsProvider");
    }
    return context;
}