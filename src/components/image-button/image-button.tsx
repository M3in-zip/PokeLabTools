interface ImageButtonProps {
    onClick: () => void;
    background?: string;
    onHoverImgSrc?: string;
    className?: string;
    widthClass?: string;
    heightClass?: string;
    text?: string;
}

export const ImageButton = ({ background, onHoverImgSrc, onClick, className, widthClass="w-36", heightClass="h-12", text }: ImageButtonProps) => {
  const cssClass = [
    "cursor-pointer",
    "flex items-center justify-center",
    "rounded-xl",
    "overflow-hidden",
    "border-2",
    "border-[#fde2ab]",
    widthClass,
    heightClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button onClick={onClick} className={cssClass}>
        {background && <img className="h-full object-cover pixel-art" src={background} />} {/* modify height it will be a fixed value */}
    </button>
  );
};
