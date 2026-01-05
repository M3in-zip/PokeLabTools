interface ImageButtonProps {
    onClick: () => void;
    buttonImgSrc?: string;
    onHoverImgSrc?: string;
    className?: string;
}

export const ImageButton = ({ buttonImgSrc, onHoverImgSrc, onClick, className }: ImageButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
        {buttonImgSrc && <img className="h-12 pixel-art" src={buttonImgSrc} />} {/* modify height it will be a fixed value */}
    </button>
  );
};
