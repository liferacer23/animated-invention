import { NextApiRequest, NextApiResponse } from "next";
import Broker from "../../app/models/brokers";
import connectMongoDb from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, identification, license, homeTown } = req.body;
    try {
      await connectMongoDb();
      await Broker.create({
        name,
        identification,
        license,
        homeTown,
      });
      res.status(201).json({ message: "Broker created successfully." });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      await connectMongoDb();
      const brokers = await Broker.find({});
      res.status(200).json({ brokers });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
