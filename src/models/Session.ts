import mongoose, { Document, Schema } from "mongoose";

export interface Session {
  elapsedTime: number;
  startVideoUrl: string;
}

export interface SessionModel extends Session, Document {}

const SessionSchema: Schema = new Schema(
  {
    elapsedTime: { type: String, required: true },
    startVideoUrl: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model<SessionModel>("Session", SessionSchema);
