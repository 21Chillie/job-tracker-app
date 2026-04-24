import { useJobDelete } from "@hooks/job/useJobForm.hook";
import formatDate from "@utils/convertDate";
import formatRelativeTime from "@utils/convetTimestamp";
import { ModalBody, ModalButton } from "~/components/reuse-ui/Modal";
import type { JobsDataType } from "~/types/job.type";
import { ModalEditBody, ModalEditButton } from "./ModalEditForm";

export function TableRow({ job }: { job: JobsDataType }) {
  const {
    id,
    user_id,
    job_title: position,
    company,
    job_status: status,
    applied_date: appliedDate,
    created_at,
  } = job;

  const { mutate } = useJobDelete({ userId: user_id, jobId: id });

  return (
    <>
      <tr className="hover:bg-base-content/20 transition-colors duration-200">
        <td>
          <p className="font-medium">{position}</p>
        </td>

        <td>
          <p>{company}</p>
        </td>

        <td>
          <div
            className={`status-${status} w-fit rounded-full px-3 py-1 text-center text-xs max-sm:text-[11px] font-bold`}
          >
            <p className="capitalize">{status}</p>
          </div>
        </td>

        <td>
          <p className="capitalize">{formatDate(appliedDate)}</p>
        </td>

        <td>
          <p className="capitalize">{formatRelativeTime(created_at)}</p>
        </td>

        <td className="flex gap-2">
          <ModalEditButton buttonModalId={`modal-edit-${id}`} />

          <ModalButton
            buttonModalId={`modal-delete-${id}`}
            buttonName="Delete"
            buttonGhost={true}
            buttonBlock={false}
            buttonSmall={true}
            textLeft={false}
          />
        </td>
      </tr>

      <ModalEditBody modalId={`modal-edit-${id}`} data={job} />

      <ModalBody
        modalId={`modal-delete-${id}`}
        title="Confirm Delete Job"
        actionName="Delete anyway"
        message="This will permanently remove the jobs and it's associated data from your jobs list."
        action={{
          danger: true,
          method: () => mutate(),
        }}
      ></ModalBody>
    </>
  );
}
