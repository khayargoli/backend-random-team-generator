import mongoose from "mongoose";

const generatedTeamSchema = new mongoose.Schema({
  title: { type: String, required: true },
  teams: [
    {
      name: { type: String, required: true },
      players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
      totalSkill: { type: Number, required: true },
    },
  ],
  generatedAt: { type: Date, default: Date.now },
});

const GeneratedTeam = mongoose.model("GeneratedTeam", generatedTeamSchema, "generated_teams_collection");

export default GeneratedTeam;