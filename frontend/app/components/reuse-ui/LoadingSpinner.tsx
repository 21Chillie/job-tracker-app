export function LoadingSpinner() {
  return (
    <>
      <div className="relative w-full">
        <div className="absolute inset-100 grid place-items-center">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      </div>
    </>
  );
}
