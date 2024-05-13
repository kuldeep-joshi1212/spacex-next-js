import {NextResponse} from "next/server";

export async function GET(req: Request, res: Response) {
    try {
        const response = await fetch('https://api.spacexdata.com/v3/launches');
        if (!response.ok) {
            throw new Error('Failed to fetch data from SpaceX API');
        }

        const data = await response.json();
        console.log("200 API RESPONSE");

        return  NextResponse.json(data);

         // Send the fetched data as the response
    } catch (error) {
        console.log("500 API RESPONSE");
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
