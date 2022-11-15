import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { apiUrl } from '../../../apiUrl';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const emailAddress = req.url?.split("/")[3];
   // Run the cors middleware
   // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
   const response = await fetch(`${apiUrl}/gigs/my-gigs/${emailAddress}`, {
      mode: 'cors',
    })
  
    if (response.status === 404) {
      return []
    }
  
    if (response.status !== 200) {
      throw new Error('Request failed')
    }
    const data = await response.json()
    res.status(200).json(data)
}