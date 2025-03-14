import Player from "../models/Player.js";

export const addPlayer = async (req, res) => {
  try {
    const { name, skill } = req.body;

    if (skill < 1 || skill > 5) {
      return res.status(400).json({ error: "Skill level must be between 1 and 5" });
    }

    const player = new Player({ name, skill });
    await player.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editPlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, skill } = req.body;

    if (skill < 1 || skill > 5) {
      return res.status(400).json({ error: "Skill level must be between 1 and 5" });
    }

    const player = await Player.findByIdAndUpdate(
      id,
      { name, skill },
      { new: true }
    );

    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Player.findByIdAndDelete(id);

    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.status(200).json({ message: "Player deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};