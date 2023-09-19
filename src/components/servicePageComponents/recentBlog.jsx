import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const RecentBlog = ({ recentBlogs }) => {
  const { postCount, categoryID, blogData } = recentBlogs;
  const [blogs, setBlogs] = useState(blogData);

  // useEffect(() => {
  //   const requestData = {
  //     postCount: postCount,
  //     categoryID: categoryID,
  //   };

  //   axios
  //     .post("/api/recent-blog", requestData)
  //     .then((response) => {
  //       setBlogs(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [postCount, categoryID]);
  return (
    <div className="flex flex-col gap-[30px] md:px-[120px] max-md:px-4">
      <p className="text-[23px] font-semibold text-center">Recent Blogs</p>
      <div className="flex max-md:flex-col gap-10 md:justify-center">
        {blogs.map((blog, index) => {
          const maxDescriptionLength = 80;
          const timestamp = blog.modified;
          const date = new Date(timestamp);
          const currentDate = new Date();
          const timeDifference = currentDate.getTime() - date.getTime();
          const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          let result;
          if (daysAgo === 0) {
            result = "today";
          } else {
            result = `${daysAgo} days ago`;
          }
          return (
            <Link
              key={index}
              className="p-3 rounded-md flex flex-col gap-2 shadow-md md:w-[376px]"
              href={blog.link}
              target="_blank"
            >
              <Image
                src={blog.yoast_head_json.og_image[0].url}
                width={360}
                height={188}
                alt="thumbnail"
              />
              <p className="text-[#212529] text-[12px]">{result}</p>
              <h3 className="text-[18px] font-semibold">
                {blog.yoast_head_json.title}
              </h3>
              <p className="text-[14px]">
                {blog.yoast_head_json.description.length > maxDescriptionLength
                  ? `${blog.yoast_head_json.description.substring(
                      0,
                      maxDescriptionLength
                    )}...`
                  : blog.yoast_head_json.description}
                <span className="text-[#007aff]">read more</span>
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecentBlog;
