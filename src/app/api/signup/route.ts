import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';
import path from 'path';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;

    const data = {
        username: email,
        password: password
    };

    try{
        console.log("hi");
        const jsonString = JSON.stringify(data);
        // console.log(jsonString);
        const filePath = path.join(process.cwd(), 'data.json');
        fs.writeFileSync(filePath, jsonString);
        res.status(200).json({ message: 'Data saved' });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error saving data' });
    }
}