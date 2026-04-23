import { createPortal } from "react-dom";

export function ModalButton({
  buttonModalId,
  buttonGhost,
  buttonSmall,
  buttonBlock,
  buttonName,
  textLeft,
}: {
  buttonModalId: string;
  buttonGhost: boolean;
  buttonSmall: boolean;
  buttonBlock: boolean;
  buttonName: string;
  textLeft: boolean;
}) {
  const handleOpen = () => {
    const modalSelect = document.getElementById(
      buttonModalId,
    ) as HTMLDialogElement | null;

    if (modalSelect) {
      modalSelect.showModal();
    }
  };

  return (
    <>
      <button
        type="button"
        className={` ${buttonSmall ? "btn btn-sm" : "btn"} ${buttonGhost && "btn-ghost"} ${buttonBlock && "btn-block"} ${textLeft && "flex justify-start"}`}
        onClick={() => handleOpen()}
      >
        {buttonName || "Open modal"}
      </button>
    </>
  );
}

export function ModalBody({
  modalId,
  title,
  message,
  actionName,
  action,
}: {
  modalId: string;
  title: string;
  message: string;
  actionName: string;
  action: {
    danger: boolean;
    method: () => void;
  };
}) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">{title || "Modal Title"}</h3>
        <p className="py-4">
          {message || "Press ESC key or click the button below to close"}
        </p>
        <div className="modal-action">
          {action && action.method ? (
            <button
              type="button"
              className={`btn ${action.danger ? "btn-error" : "btn-primary"}`}
              onClick={action.method}
            >
              {actionName || "Action"}
            </button>
          ) : null}

          <form method="dialog">
            <button className="btn btn-ghost">Close</button>
          </form>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>,
    document.body,
  );
}
