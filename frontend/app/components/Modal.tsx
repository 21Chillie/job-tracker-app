

export function ModalButton({
  buttonGhost,
  buttonSmall,
  buttonBlock,
  buttonName,
  textLeft,
}: {
  buttonGhost: boolean;
  buttonSmall: boolean;
  buttonBlock: boolean;
  buttonName: string;
  textLeft: boolean;
}) {
  const handleOpen = () => {
    const modalSelect = document.getElementById(
      "my_modal",
    ) as HTMLDialogElement | null;

    if (modalSelect) {
      modalSelect.showModal();
    }
  };

  return (
    <>
      <button
        className={`${buttonSmall ? "btn btn-sm" : "btn"} ${buttonGhost && "btn-ghost"} ${buttonBlock && "btn-block"} ${textLeft && "flex justify-start"}`}
        onClick={() => handleOpen()}
      >
        {buttonName || "Open modal"}
      </button>
    </>
  );
}

export function ModalBody({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action: {
    danger: boolean;
    method: () => void;
  };
}) {
  return (
    <>
      <dialog id={"my_modal"} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{title || "Modal Title"}</h3>
          <p className="py-4">
            {message ||
              " Press ESC key or click the button below to close Press ESC key or click the button below to close Press ESC key or click the button below to close"}
          </p>
          <div className="modal-action">
            {action && action.method ? (
              <button
                type="button"
                className={`btn ${action && action.danger ? "btn-error" : "btn-primary"}`}
                onClick={action.method}
              >
                Signout
              </button>
            ) : null}

            <form method="dialog">
              <button className="btn btn-ghost">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
