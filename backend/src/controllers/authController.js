const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
    }

    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedSenha = await bcrypt.hash(senha, salt);

    // Create user
    const userId = await User.create({
      nome,
      email,
      senha: hashedSenha
    });

    // Generate token for automatic login
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET não definido!');
      return res.status(500).json({ message: 'Configuração do servidor incorreta.' });
    }

    const token = jwt.sign(
      { id: userId },
      jwtSecret,
      { expiresIn: '7d' }
    );

    res.status(201).json({ 
      message: 'Usuário registrado com sucesso!', 
      token,
      user: {
        id: userId,
        nome,
        email
      }
    });
  } catch (error) {
    console.error('REGISTER ERROR:', error.message);
    res.status(500).json({ message: 'Erro ao registrar usuário: ' + error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Email ou senha incorretos.' });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou senha incorretos.' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET não definido!');
      return res.status(500).json({ message: 'Configuração do servidor incorreta.' });
    }

    const token = jwt.sign(
      { id: user.id },
      jwtSecret,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email
      }
    });
  } catch (error) {
    console.error('LOGIN ERROR:', error.message);
    res.status(500).json({ message: 'Erro ao fazer login: ' + error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email é obrigatório.' });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      // Por segurança, convém dar uma mensagem genérica, mas aqui mostramos a falta dele para depuração mais amigável
      return res.status(404).json({ message: 'Se o e-mail estiver registado, vai receber instruções.' });
    }

    // Gerar um token seguro (expira em 30 minutos)
    const resetToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '30m' }
    );

    // O link aponta para o Frontend, que lerá o token do URL
    // Aqui tem que usar URL atual do frontend (assumindo :5173 na dev)
    const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${frontendURL}/reset-password?token=${resetToken}`;

    const mensagemHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #0061ff;">Recuperação de Palavra-passe</h2>
        <p>Olá, ${user.nome}!</p>
        <p>Recebemos um pedido para redefinir a sua palavra-passe no <strong>TaskFlow</strong>.</p>
        <p>Clique no botão abaixo para definir uma nova palavra-passe:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #0061ff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Redefinir Palavra-passe</a>
        </div>
        <p>Se o botão não funcionar, copie e cole a hiperligação abaixo no seu browser:</p>
        <p style="word-break: break-all; color: #666; font-size: 0.9em;">
          <a href="${resetUrl}">${resetUrl}</a>
        </p>
        <p>Este link irá expirar em 30 minutos por motivos de segurança.</p>
        <p>Se não pediu isto, por favor ignore este email.</p>
        <br />
        <p>Obrigado,<br />Equipa TaskFlow</p>
      </div>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: 'TaskFlow - Redefinir Palavra-passe',
        html: mensagemHTML
      });

      res.status(200).json({ 
        message: 'Instruções de recuperação foram enviadas para o seu e-mail.' 
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return res.status(500).json({ 
        message: 'Ocorreu um erro ao enviar o e-mail. Por favor, verifique se a sua conta de e-mail está configurada corretamente no ficheiro .env (Servidor SMTP).' 
      });
    }

  } catch (error) {
    console.error('FORGOT PASSWORD ERROR:', error.message);
    res.status(500).json({ message: 'Erro ao processar recuperação de senha: ' + error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token e nova palavra-passe são obrigatórios.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'A palavra-passe deve ter pelo menos 6 caracteres.' });
    }

    // Verificar se o token é válido
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(400).json({ message: 'O link de recuperação é inválido ou expirou. Por favor peça um novo.' });
    }

    const userId = decoded.id;

    // Fazer Hash da Nova Senha
    const salt = await bcrypt.genSalt(10);
    const hashedSenha = await bcrypt.hash(newPassword, salt);

    // Atualizar no banco de dados
    await User.update(userId, { senha: hashedSenha });

    res.status(200).json({ message: 'Palavra-passe redefinida com sucesso! Já pode iniciar sessão.' });

  } catch (error) {
    console.error('RESET PASSWORD ERROR:', error.message);
    res.status(500).json({ message: 'Erro ao redefinir palavra-passe: ' + error.message });
  }
};
