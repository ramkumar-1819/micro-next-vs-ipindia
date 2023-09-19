import axios from "axios";

export async function POST(req) {
  const payload = await req.json();
  const { postCount, categoryID } = payload;

  const params = {
    per_page: postCount || 1,
    categories: categoryID || 43106,
    status: "publish",
  };
  try {
    const { data } = await axios({
      url: "https://vakilsearch.com/blog/wp-json/wp/v2/posts",
      method: 'GET',
      params,
    });
    return NextResponse.json({ data },{ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error },{ status: 400 });
  }
}