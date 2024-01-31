import type { APIRoute } from 'astro';


const results = [
    {
        title: "Result 1",
        tag: "Tag 1",
        description: "This is the description for Result 1."
    },
    {
        title: "Result 2",
        tag: "Tag 2",
        description: "This is the description for Result 2."
    },
    {
        title: "Result 3",
        tag: "Tag 3",
        description: "This is the description for Result 3."
    }
];

export const GET: APIRoute = (request) => {
    console.log(request)
    const queryParams = new URL(request.url).searchParams;
    const query = queryParams.get('query') as string;    
    const filteredResults = results.filter(result => 
        Object.values(result).some(value => 
            value.toLowerCase().includes(query.toLowerCase())
        )
    );
    return new Response(JSON.stringify({
            results: filteredResults
        })
    )
}