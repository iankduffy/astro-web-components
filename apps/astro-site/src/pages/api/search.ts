import type { APIRoute } from 'astro';

export const GET: APIRoute = (request) => {
    const { searchParams } = new URL(request.url);
    console.log({searchParams})
    return new Response(JSON.stringify({
        path: new URL(request.url).pathname
      })
    )
  }