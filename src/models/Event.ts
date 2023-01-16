import mongoose, { Document, Schema } from "mongoose";

// !! have a play event not time elapsed
export interface Event {
  userId: string;
  sessionId: string;
  type: string;
  sessionIncrement: number;
  timeStamp: number;
  globalTimeStamp: Date;
  seekToTimeStamp?: number;
  pauseTimeElapsed?: number;
  newVideoUrl?: string;
}

export interface EventModel extends Event, Document {}

const EventSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    sessionId: { type: String, required: true },
    type: {
      type: String,
      enum: ["Pause", "Play", "Seek", "Switch"],
      required: true,
    },
    sessionIncrement: { type: Number, required: true },
    timeStamp: { type: Number, required: true },
    globalTimeStamp: { type: Date, default: Date.now },
    seekToTimeStamp: { type: Number, required: false },
    pauseTimeElapsed: { type: Number, required: false },
    newVideoUrl: { type: String, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model<EventModel>("Event", EventSchema);
