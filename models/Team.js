import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }], // Array of player references
});

const Team = mongoose.model("Team", teamSchema, "teams_collection" );

export default Team;