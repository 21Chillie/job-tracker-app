export function TableRow({
  position,
  company,
  jobPostingUrl,
  status,
  notes,
}: {
  position: string;
  company: string;
  jobPostingUrl: string;
  status: string;
  notes: string;
}) {
  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <tr className="hover:bg-base-content/20 transition-colors duration-200">
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>

        <td>
          <p className="font-medium">{position}</p>
        </td>

        <td>
          <p>{company}</p>
        </td>

        <td>
          <div
            className={`status-${status} w-fit rounded-full px-3 py-1 text-center text-xs font-bold`}
          >
            <p className="capitalize">{status}</p>
          </div>
        </td>

        <td>
          <p>{todayDate}</p>
        </td>

        <td>
          <p>{todayDate}</p>
        </td>

        <td>
          <button className="btn btn-sm btn-primary">Edit</button>
        </td>
      </tr>
    </>
  );
}
