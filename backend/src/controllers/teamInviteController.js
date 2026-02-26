const TeamInvite = require('../models/TeamInvite');
const Team = require('../models/Team');
const Notification = require('../models/Notification');

const teamInviteController = {
  sendInvite: async (req, res) => {
    try {
      const { equipa_id, utilizador_id } = req.body;
      const remetente_id = req.user.id;

      // Verificar se é o líder ou admin
      const team = await Team.getById(equipa_id);
      if (!team) return res.status(404).json({ message: 'Equipa não encontrada.' });
      
      if (team.lider_id !== remetente_id && req.user.tipo !== 'admin') {
        return res.status(403).json({ message: 'Apenas o líder da equipa pode enviar convites.' });
      }

      // Verificar se já existe convite pendente
      const alreadyPending = await TeamInvite.checkPending(equipa_id, utilizador_id);
      if (alreadyPending) {
        return res.status(400).json({ message: 'Já existe um convite pendente para este utilizador.' });
      }

      // Verificar se já é membro
      const members = await Team.getMembers(equipa_id);
      if (members.find(m => m.id === parseInt(utilizador_id))) {
        return res.status(400).json({ message: 'O utilizador já é membro desta equipa.' });
      }

      const inviteId = await TeamInvite.create({ equipa_id, utilizador_id, remetente_id });
      
      // Criar notificação para o destinatário com o ID do convite
      await Notification.create({
        utilizador_id,
        titulo: 'Convite de Equipa',
        mensagem: `Foi convidado para entrar na equipa "${team.nome}" por ${req.user.nome}.`,
        tipo: 'convite',
        link: `/teams`,
        referencia_id: inviteId
      });

      res.status(201).json({ message: 'Convite enviado com sucesso!', inviteId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao enviar convite.' });
    }
  },

  getMyInvites: async (req, res) => {
    try {
      const invites = await TeamInvite.getByUserId(req.user.id);
      res.json(invites);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao carregar convites.' });
    }
  },

  respondToInvite: async (req, res) => {
    try {
      const { inviteId, accept } = req.body;
      const invite = await TeamInvite.getById(inviteId);

      if (!invite || invite.utilizador_id !== req.user.id) {
        return res.status(404).json({ message: 'Convite não encontrado.' });
      }

      if (invite.status !== 'pendente') {
        return res.status(400).json({ message: 'Este convite já foi processado.' });
      }

      const status = accept ? 'aceite' : 'recusado';
      await TeamInvite.updateStatus(inviteId, status);

      if (accept) {
        await Team.addMember(invite.equipa_id, invite.utilizador_id);
        
        // Notificar remetente que o convite foi aceite
        await Notification.create({
          utilizador_id: invite.remetente_id,
          titulo: 'Convite Aceite',
          mensagem: `${req.user.nome} aceitou o seu convite para a equipa.`,
          tipo: 'sistema',
          link: `/teams`
        });
      }

      res.json({ message: accept ? 'Convite aceite!' : 'Convite recusado.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao processar convite.' });
    }
  }
};

module.exports = teamInviteController;
