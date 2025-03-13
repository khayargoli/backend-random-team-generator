import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skill: { type: Number, required: true, min: 1, max: 5 },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null }, // Reference to the team
});

const Player = mongoose.model("Player", playerSchema, "players_collection");

export default Player;