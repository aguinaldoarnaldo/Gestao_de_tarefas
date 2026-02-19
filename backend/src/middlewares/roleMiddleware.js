exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.tipo === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
  }
};
