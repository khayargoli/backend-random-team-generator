import Team from "../models/Team.js";
import Player from "../models/Player.js";
import GeneratedTeam from "../models/GeneratedTeam.js";

export const addTeam = async (req, res) => {
    try {
        const { name } = req.body;

        const team = new Team({ name });
        await team.save();
        res.status(201).json(team);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const editTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const team = await Team.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }

        res.status(200).json(team);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team.findByIdAndDelete(id);

        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }

        res.status(200).json({ message: "Team deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(200).json(teams);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getGeneratedTeams = async (req, res) => {
    try {
        const { id } = req.params;

        const teamDistribution = await GeneratedTeam.findById(id).populate({
            path: "teams.players",
            model: "Player",
        });

        if (!teamDistribution) {
            return res.status(404).json({ error: "Team distribution not found" });
        }

        res.status(200).json(teamDistribution);
    } catch (error) {
        console.error("Error fetching team distribution:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


export const generateBalancedTeam = async (req, res) => {
    try {
        const { title } = req.body;

        const players = await Player.find();
        const teams = await Team.find();

        // Check if there are enough teams
        if (teams.length < 2) {
            return res.status(400).json({ error: "You need at least 2 teams to generate teams" });
        }

        // Check if there are enough players
        if (players.length < teams.length) {
            return res.status(400).json({ error: "Not enough players to form teams" });
        }

        const sortedPlayers = [...players].sort((a, b) => b.skill - a.skill);

        // Initialize teams with empty players arrays and zero skill
        const teamData = teams.map(team => ({
            ...team.toObject(),
            players: [],
            totalSkill: 0
        }));

        for (let i = 0; i < sortedPlayers.length; i++) {
            const player = sortedPlayers[i];

            // Find team with lowest total skill
            let lowestSkillTeam = teamData[0];
            let lowestSkill = teamData[0].totalSkill;

            for (let j = 1; j < teamData.length; j++) {
                if (teamData[j].totalSkill < lowestSkill) {
                    lowestSkill = teamData[j].totalSkill;
                    lowestSkillTeam = teamData[j];
                }
            }

            // Add player to lowestSkill team
            lowestSkillTeam.players.push(player);
            lowestSkillTeam.totalSkill += player.skill;
        }


        const savedGeneratedTeam = new GeneratedTeam({
            title,
            teams: teamData,
        });
        const savedTeam = await savedGeneratedTeam.save();

        res.status(200).json({
            title,
            teams: teamData,
            id: savedTeam._id
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};