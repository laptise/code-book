// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { spawn, spawnSync } from "child_process";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const pythonProcess = spawnSync("python", ["./lib/start.py", "testProf"]);
  const msg = pythonProcess.stdout.toString();
  res.status(200).send(msg);
}
