import mongoose, { Document, Schema } from "mongoose";

export interface Session {
  sessionId: string;
  elapsedTime: number;
  startVideoUrl: string;
  currentVideoUrl: string;
}

export interface SessionModel extends Session, Document {}

const SessionSchema: Schema = new Schema(
  {
    sessionId: { type: String, required: true },
    elapsedTime: { type: Number, required: true, default: 0 },
    startVideoUrl: { type: String, required: true },
    currentVideoUrl: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model<SessionModel>("Session", SessionSchema);
