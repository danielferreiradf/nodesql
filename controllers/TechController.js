const User = require("../models/User");
const Tech = require("../models/Tech");

module.exports = {
  async store(req, res) {
    try {
      const { user_id } = req.params;
      const { name } = req.body;

      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }

      const [tech] = await Tech.findOrCreate({ where: { name } });

      await user.addTech(tech);

      return res.json(tech);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async index(req, res) {
    try {
      const { user_id } = req.params;

      const user = await User.findByPk(user_id, {
        include: { association: "techs", through: { attributes: [] } }
      });

      return res.json(user.techs);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { user_id } = req.params;
      const { name } = req.body;

      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }

      const tech = await Tech.findOne({ where: { name } });

      await user.removeTech(tech);

      return res.json({ message: "Tech deleted." });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
};
