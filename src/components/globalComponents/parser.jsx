import { useEffect, useState } from "react";
import { parse, serialize } from "parse5";

const Parser = ({ content, className='' }) => {
  const [parsedHtml, setParsedHtml] = useState(parse(content));

  useEffect(() => {
    // Check if the code is running on the client-side (window object exists)
    if (typeof window !== "undefined") {
      // Parse the HTML string on the client-side
      // const parsedHtml = parse(content);
      // setParsedHtml(parsedHtml);
    }
  }, []);

  if (!parsedHtml) {
    return null; // Don't render anything on the server side or until parsing is done on the client side
  }

  // Convert the parsed HTML object back to an HTML string
  const serializedHtml = serialize(parsedHtml);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: serializedHtml }}
    />
  );
};

export default Parser;
