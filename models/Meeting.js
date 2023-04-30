import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    friendId: {
      type: String,
      required: true,
    },
    itemNo: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Meeting = mongoose.model("Meeting", MeetingSchema);
export default Meeting;
