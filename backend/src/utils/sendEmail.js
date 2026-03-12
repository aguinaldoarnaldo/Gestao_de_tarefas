const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  // Log para diagnóstico (remover em produção)
  console.log('📧 EMAIL_USER:', emailUser || '❌ NÃO DEFINIDO');
  console.log('📧 EMAIL_PASS:', emailPass ? `✅ definido (${emailPass.length} chars)` : '❌ NÃO DEFINIDO');

  if (!emailUser || !emailPass) {
    throw new Error('Credenciais de e-mail não configuradas. Verifique EMAIL_USER e EMAIL_PASS no ficheiro .env');
  }

  // Configuração do transporter Gmail com SMTP explícito
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });

  const mailOptions = {
    from: `"TaskFlow" <${emailUser}>`,
    to,
    subject,
    html
  };

  // Verificar ligação antes de enviar
  await transporter.verify();

  const info = await transporter.sendMail(mailOptions);
  console.log('✅ E-mail enviado:', info.messageId);
  return info;
};

module.exports = sendEmail;
