import express from "express";
import {
  addPlayer,
  editPlayer,
  deletePlayer,
  getAllPlayers,
} from "../controllers/playerController.js";

const router = express.Router();

// Player routes
router.post("/", addPlayer);
router.put("/:id", editPlayer);
router.delete("/:id", deletePlayer);
router.get("/", getAllPlayers);

export default router;