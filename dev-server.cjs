const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  const user = process.env.EMAIL_USER=contact@chelylev.com
  const pass = process.env.EMAIL_PASS=123456aA@@

  console.log('\n--- TENTATIVE D\'ENVOI ---');
  
  if (!pass || pass.includes('VOTRE_MOT_DE_PASSE')) {
    console.log('ERREUR: Mot de passe non configuré.');
    return res.status(500).json({ success: false, message: "Mot de passe non configuré dans .env" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass } ,
      tls: { rejectUnauthorized: false }
    });

    await transporter.sendMail({
      from: `"Contact Site" <${user}>`,
      to: "chelylev@gmail.com",
      replyTo: email,
      subject: `Message de ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\nMessage: ${message}`,
    });

    console.log('SUCCÈS ! Email envoyé.');
    res.json({ success: true, message: "Email envoyé avec succès" });
  } catch (error) {
    console.log('ERREUR:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(3001, () => {
  console.log('Moteur d\'envoi prêt sur http://localhost:3001');
});
