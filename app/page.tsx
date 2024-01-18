import DateChanger from "@/components/DateChanger";
import RoomBooking from "@/components/RoomBooking";
import getUser from "@/hooks/getUser";
import { redirect } from "next/navigation";

export default async function Index() {

	const user = await getUser();

	if (!user) {
		redirect("/login");
	}
	else {
		return (
			<div className="flex-1 w-full flex flex-col gap-5 mt-4 items-center">
				<DateChanger />
				<RoomBooking />
			</div>
		);
	}
}
