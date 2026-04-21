import type { JobsDataType } from "~/types/job.type";
import formatRelativeTime from "~/utils/convetTimestamp";

export function TableRow({
  id,
  job_title: position,
  company,
  job_url,
  job_status: status,
  applied_date: appliedDate,
  notes,
  created_at: createdAt,
  updated_at: updatedAt,
}: JobsDataType) {
  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <tr className="hover:bg-base-content/20 transition-colors duration-200">
        {/*<th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>*/}

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
          <p className="capitalize">{formatRelativeTime(appliedDate)}</p>
        </td>

        <td>
          <button className="btn btn-sm btn-primary">Edit</button>
        </td>
      </tr>
    </>
  );
}
