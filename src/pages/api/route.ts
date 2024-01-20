import { NextApiRequest, NextApiResponse } from "next";
import Broker from "../../app/models/brokers";
import connectMongoDb from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectMongoDb();
      await Broker.insertMany(req.body);
      res.status(201).json({ message: "Broker created successfully." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  } else if (req.method === "GET") {
    try {
      await connectMongoDb();
      // const brokers = await Broker.find({});
      const brokersCount = await Broker.countDocuments({});
      const brokersByCity = await Broker.aggregate([
        {
          $group: {
            _id: "$homeTown",
            count: { $sum: 1 },
            latestEntry: { $first: "$createdAt" },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
      ]);

      const latestEntry = await Broker.findOne().sort({ createdAt: -1 });
      const groupBrokersByCreatedAt = await Broker.aggregate([
        {
          $group: {
            _id: "$createdAt",
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);

      res.status(200).json({
        brokersCount: brokersCount,
        brokersByCity: brokersByCity,
        latestEntry: latestEntry.createdAt,
        groupBrokersByCreatedAt: groupBrokersByCreatedAt,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
