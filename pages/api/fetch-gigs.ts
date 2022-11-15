import { NextApiRequest, NextApiResponse } from "next"
// import Cors from 'cors'

// // Initializing the cors middleware
// // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
// const cors = Cors({
//   methods: ['POST', 'GET', 'HEAD'],
// })

// // Helper method to wait for a middleware to execute before continuing
// // And to throw an error when an error happens in a middleware
// function runMiddleware(
//   req: NextApiRequest,
//   res: NextApiResponse,
//   fn: Function
// ) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) {
//         return reject(result)
//       }

//       return resolve(result)
//     })
//   })
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   // Run the middleware
//   console.log(req,'\t',res)
//   await runMiddleware(req, res, cors)

//   // Rest of the API logic
//   // const apiUrl = req.body.apiUrl;
//   // const apiUrl = (req.query.apiUrl)
//   // const res = await fetch(`${apiUrl}/gigs/unclaimed`, {
//   //     mode: 'cors',
//   //   })
//   // // const res = await fetch(`${apiUrl}/gigs/unclaimed`, {
//   // //   mode: 'cors',
//   // // })

//   // if (res.status === 404) {
//   //   return []
//   // }

//   // if (res.status !== 200) {
//   //   throw new Error('Request failed')
//   // }

//   // return await res.json()
// }


import NextCors from 'nextjs-cors';
import { apiUrl } from "../../apiUrl";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    // const apiUrl = "https://func-serverless-dev-api.azurewebsites.net/api";
  //   req.url = apiUrl + "/gigs/unclaimed";
  //  // Run the cors middleware
  //  // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  //  await NextCors(req, res, {
  //     // Options
  //     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  //     origin: '*',
  //     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  //  });

  //  // Rest of the API logic
  //  console.log(res);
  //  res.json({ message: 'get all gigs' });



  // // Previous API call using fetch...
   const response = await fetch(`${apiUrl}/gigs/unclaimed`, {
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
  // return await response.json()
}


