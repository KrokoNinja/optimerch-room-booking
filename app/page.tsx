import RoomBooking from "@/components/RoomBooking";

export default function Index() {

	return (
		<div className="flex-1 w-full flex flex-col gap-20 items-center">
			

				{/* <FormDialog meetings={meetings} />
				<div className="flex w-full max-w-5xl">
					<TimeTable />
					<RoomTable meetings={meetings} room="aplerbeck" />
					<RoomTable meetings={meetings} room="hoerde" />
					<RoomTable meetings={meetings} room="brackel" />
				</div> */}
			<RoomBooking />

		</div>
	);
}
