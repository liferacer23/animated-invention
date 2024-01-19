import mongoose, { Schema } from "mongoose";

const BrokerSchema = new Schema(
  {
    name: String,
    identification: Number,
    license: Number,
    name: String,
    homeTown: String,
  },
  {
    timestamps: true,
  }
);

const Broker = mongoose.models.Broker || mongoose.model("Broker", BrokerSchema);

export default Broker;
