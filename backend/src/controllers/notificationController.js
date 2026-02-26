const Notification = require('../models/Notification');

const notificationController = {
  getMyNotifications: async (req, res) => {
    try {
      const notifications = await Notification.getByUserId(req.user.id);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao carregar notificações.' });
    }
  },

  markAsRead: async (req, res) => {
    try {
      await Notification.markAsRead(req.params.id);
      res.json({ message: 'Notificação marcada como lida.' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar notificação.' });
    }
  },

  markAllAsRead: async (req, res) => {
    try {
      await Notification.markAllAsRead(req.user.id);
      res.json({ message: 'Todas as notificações marcadas como lidas.' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar notificações.' });
    }
  },

  delete: async (req, res) => {
    try {
      await Notification.delete(req.params.id);
      res.json({ message: 'Notificação eliminada.' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao eliminar notificação.' });
    }
  }
};

module.exports = notificationController;
