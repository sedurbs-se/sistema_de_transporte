

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    id:string
    nome: string
    login:string
}

type Error = {
    error: string
}
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | Error>
) {

    const { login, password } = req.body;
    console.log(login, password)
    if (login == 'admin' && password == 'admin') {
        res.status(200).json({ 
            id:"1",
            login: 'admin',
            nome: 'John Doe' 
        
        })
    }
    else {
        res.status(401).json({ error: 'Invalid credentials' })
    }
}