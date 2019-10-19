const User = require("../models/User");
// index, show, create, update, destroy

module.exports = {
  async store(req, res) {
    try {
      const { name, email } = req.body;

      const user = await User.findOrCreate({
        where: { email },
        defaults: { name, email }
      });

      return res.json(user[0]);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      return res.json({ user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async index(req, res) {
    try {
      const users = await User.findAll();

      if (!users) {
        return res.status(404).json({ message: "There are no users." });
      }

      return res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      let user;

      user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      await User.update({ name, email }, { where: { id } });
      user = await User.findByPk(id);

      return res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      let user;
      user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      user = await User.destroy({ where: { id } });
      if (user == 1) {
        return res.json({ message: "User deleted." });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
