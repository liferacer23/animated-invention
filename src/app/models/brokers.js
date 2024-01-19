import mongoose, { Schema } from "mongoose";

const BrokerSchema = new Schema(
  {
    id: String,
    name: String,
    identification: Number,
    license: Number,
    homeTown: String,
    status: String,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Broker = mongoose.models.Broker || mongoose.model("Broker", BrokerSchema);

export default Broker;
