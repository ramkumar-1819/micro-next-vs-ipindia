import axios from "axios";
const url = require('url');

export async function GET(request) {
    const searchParams = url.parse(request.url, true);
    const query = searchParams.query;
    console.log('REPSSS', {...query});
    return new Response('OK')
}

export async function POST(request) {
    const payload = await request.json();
    console.log('REPSSS', payload);
    return new Response('OK')
}
