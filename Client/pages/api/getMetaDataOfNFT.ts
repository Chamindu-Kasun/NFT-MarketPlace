import type { NextApiRequest, NextApiResponse } from 'next'
import {Request} from "../../utils/Request"

type Data = {
  name: string
}

const env = process.env;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  new Request(`https://api.etherscan.io`, {}).Path(`/api
  ?module=token
  &action=tokeninfo
  &contractaddress=0x8927985b358692815e18f2138964679dca5d3b79
  &apikey=${env.API_KEY_ETHERSCAN}`).GET().ExecuteJson()
    .then(response => {
      res.status(200).json(response)
    }).catch(err => {
      res.status(200).json(err.response)
    })
}