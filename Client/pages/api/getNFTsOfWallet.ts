import type { NextApiRequest, NextApiResponse } from "next";
import { Request } from "../../utils/Request";

type Data = {
  name: string;
};

const env = process.env;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { walletAddress } = req.query;
  new Request(`https://api-testnet.snowtrace.io`, {})
    .Path(
      `/api?module=account&action=tokennfttx&address=${walletAddress}&startblock=0&endblock=999999999&sort=asc`
    )
    .GET()
    .ExecuteJson()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(200).json(err.response);
    });
}
