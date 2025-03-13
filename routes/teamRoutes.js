import express from "express";
import {
  addTeam,
  editTeam,
  deleteTeam,
  getAllTeams,
  generateBalancedTeam,
  getGeneratedTeams
} from "../controllers/teamController.js";

const router = express.Router();

// Team routes
router.post("/", addTeam);
router.put("/:id", editTeam);
router.delete("/:id", deleteTeam);
router.get("/", getAllTeams);


// Team generation route
router.post("/generate", generateBalancedTeam);
router.get("/generated-teams/:id", getGeneratedTeams);

export default router;