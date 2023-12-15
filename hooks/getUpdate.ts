import { getMeetings } from "@/actions/getMeetings";

export default function getUpdate(reload : boolean = false) {
    getMeetings();
    if (reload) window.location.reload();
}