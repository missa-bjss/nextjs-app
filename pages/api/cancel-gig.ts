import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    console.log("cancel-gig")
    const apiUrl = req.body.apiUrl;
    const id = req.body.gig_id;
    const emailAddress = JSON.stringify(req.body.emailAddress.replace("'",'"'));
    console.log(apiUrl,'\t',id,'\t',emailAddress)
    const response = await fetch(`${apiUrl}/gigs/${id}/cancel`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: emailAddress
    })
  
    if (response.status !== 200) {
      throw new Error('Request failed')
    }
    console.log(response)
    const data = await response.json();
    res.status(200).json(data)
  }


// import { NextApiRequest, NextApiResponse } from 'next';
// import NextCors from 'nextjs-cors';

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
//   ) {
//     console.log(req.url);
//    // Run the cors middleware
//    // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
//    await NextCors(req, res, {
//       // Options
//       methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//       origin: '*',
//       optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//    });

//    // Rest of the API logic
//    res.json({ message: 'Hello NextJs Cors!' });
// }