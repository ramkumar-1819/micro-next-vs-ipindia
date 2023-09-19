export const Card = ({ cardData, isYellowCard, isStaticCard }) => {
  return (
    <div
      className={`flex flex-col max-w-[160px] md:w-full md:max-w-[240px] h-fit shadow-lg ${
        isYellowCard ? "bg-[#ffd000] mb-10" : "bg-white"
      } ${isStaticCard ? "mt-10" : ""}`}
    >
      {cardData.map((data, index) => (
        <p
          key={index}
          className={`p-4 text-[14px] text-[#212529] font-medium break-words border-b-[1px] border-[#e9ebec] h-[75px] flex items-center ${
            !isStaticCard ? "justify-center text-center" : ""
          }`}
        >
          {data}
        </p>
      ))}
    </div>
  );
};
