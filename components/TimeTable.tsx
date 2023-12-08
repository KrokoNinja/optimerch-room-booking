function TimeTable() {
	return (
		<table className="text-center bg-slate-600">
			<thead className="border-b">
				<tr>
					<th>Uhrzeit</th>
				</tr>
			</thead>
			<tbody>
				{Array.from({ length: 44 }).map((_, index) => {
					const hour = Math.floor(index / 4) + 7;
					const minute = (index % 4) * 15;
					const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
					return (
						<tr key={index} className="border-y last:border-none">
							<td>{time}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default TimeTable;
