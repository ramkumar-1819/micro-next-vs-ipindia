import Link from "next/link";

const StickyUrlSection = ({ stickyLinksContent }) => {
  return (
    <div className="flex flex-col gap-[25px] text-left  md:sticky md:top-[70px] md:bottom-[10px]">
      <p className="text-[16px] font-bold">{stickyLinksContent.title}</p>
      <div className="flex flex-col gap-[32px]">
        {stickyLinksContent.links.map((data, index) => {
          return (
            <Link className=" text-[#007AFF]" key={index} href={data.href}>
              {data.url}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default StickyUrlSection;
