import { NextApiRequest, NextApiResponse } from "next"
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("inside request-gig handler")
    const apiUrl = req.body.apiUrl;
    const id = req.body.gig_id;
    const emailAddress = JSON.stringify(req.body.emailAddress.replace("'",'"'));
    console.log(emailAddress)
  const response = await fetch(`${apiUrl}/gigs/${id}/claim`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ emailAddress }),
  })

  if (response.status !== 200) {
    throw new Error('Request failed')
  }
}