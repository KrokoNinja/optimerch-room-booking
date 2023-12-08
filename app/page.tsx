import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Meeting from "@/components/Meeting";
import { getHoerde } from "@/hooks/getHoerde";
import { getAplerbeck } from "@/hooks/getAplerbeck";
import { getBrackel } from "@/hooks/getBrackel";
import { getSpan } from "@/hooks/getSpan";
import TimeTable from "@/components/TimeTable";
import RoomTable from "@/components/RoomTable";

export default async function Index() {
	const cookieStore = cookies();

	const canInitSupabaseClient = () => {
		// This function is just for the interactive tutorial.
		// Feel free to remove it once you have Supabase connected.
		try {
			createClient(cookieStore);
			return true;
		} catch (e) {
			return false;
		}
	};

	const isSupabaseConnected = canInitSupabaseClient();

	const supabase = createClient(cookieStore);

	const { data } = await supabase.from("rooms").select().order("start", { ascending: true });
	const meetings = data?.map((meeting) => {
		return {
			startHour: new Date(meeting.start).getHours(),
			startMinute: new Date(meeting.start).getMinutes(),
			endHour: new Date(meeting.end).getHours(),
			endMinute: new Date(meeting.end).getMinutes(),
			room: meeting.room,
		};
	}, []);

	return (
		<div className="flex-1 w-full flex flex-col gap-20 items-center">
			<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
				<div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
					{isSupabaseConnected && <AuthButton />}
				</div>
			</nav>

			<div className="flex w-full max-w-5xl">
				<TimeTable />
				<RoomTable meetings={meetings} room="aplerbeck" />
				<RoomTable meetings={meetings} room="hoerde" />
				<RoomTable meetings={meetings} room="brackel" />
			</div>

			<footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
				<p>
					Powered by{" "}
					<a
						href="https://www.optimerch.de/"
						target="_blank"
						className="font-bold hover:underline"
						rel="noreferrer"
					>
						Optimerch GmbH
					</a>
				</p>
			</footer>
		</div>
	);
}
