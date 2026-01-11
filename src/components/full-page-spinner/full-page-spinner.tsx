export const FullPageSpinner = () => {
    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-[2px] cursor-wait">
      <div className="flex flex-col items-center">
        <i className="fa-solid fa-circle-notch animate-spin text-5xl"></i>
        <span className="mt-4 text-black-600 font-semibold tracking-wide">
          Caricamento dati...
        </span>
      </div>
    </div>
  );
}