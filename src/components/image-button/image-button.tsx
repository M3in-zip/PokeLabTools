interface ImageButtonProps {
    onClick: () => void;
    buttonImgSrc?: string;
    onHoverImgSrc?: string;
}

export const ImageButton = ({ buttonImgSrc, onHoverImgSrc, onClick }: ImageButtonProps) => {
  return (
    <button onClick={onClick}>
        {buttonImgSrc && <img className="h-16" src={buttonImgSrc} />} {/* modify height it will be a fixed value */}
    </button>
  );
};
