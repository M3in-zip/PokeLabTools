interface ImageButtonProps {
  onClick: () => void;
  background?: string;
  onHoverImgSrc?: string;
  className?: string;
  heightClass?: string; // we keep height fixed if you want
  text?: string;
  icon?: string;
}

export const ImageButton = ({
  background,
  onClick,
  className,
  heightClass = "h-12",
  text,
  icon,
}: ImageButtonProps) => {
  const cssClass = [
    "relative",
    "cursor-pointer",
    "flex items-center justify-center",
    "rounded-xl",
    "overflow-hidden",
    "border-2",
    "border-[#fde2ab]",
    "px-4",
    heightClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button onClick={onClick} className={cssClass}>
      {background && (
        <img
          className="absolute top-0 left-1/2 h-full w-auto -translate-x-1/2 object-cover pixel-art"
          src={background}
        />
      )}
      {(icon || text) && (
        <span className="relative z-10 flex items-center">
          {icon && <i className={`${icon} text-[#fde2ab] ${text ? "mr-2" : ""}`}></i>}
          {text && <span className="text-[#fde2ab] font-bold">{text}</span>}
        </span>
      )}
    </button>
  );
};
