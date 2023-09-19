import Image from "next/image";

const ListCard = (props) => {
  const { mainClassStyle, width, height, textStyle, image, imageClass,text } = props;
  return (
    <div className={`flex ${mainClassStyle ? mainClassStyle : "gap-2"}`}>
      <Image
        className={imageClass ? imageClass : ""}
        src={image}
        width={width}
        height={height}
        alt="image"
      />
      <p className={textStyle ? textStyle : "text-[14px] font-normal"}>
        {text}
      </p>
    </div>
  );
};

export default ListCard;
