// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "dotenv";

import { spawn, spawnSync } from "child_process";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  config();

  console.log(
    spawnSync("pip", [
      "install",
      "-r",
      "./lib/requirements.txt",
    ]).stdout.toString()
  );
  const { stderr, stdout } = spawnSync("env", [
    `OPENAI_API_KEY=${process.env.OPENAI_API_KEY || ""}`,
    "python",
    "./lib/start.py",
    "testProf",
  ]);

  if (stderr) {
    console.log(stderr.toString());
  }

  if (stdout) {
    res.status(200).json(stdout.toString());
  }
}
