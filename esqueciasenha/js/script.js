document.getElementById('resetForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const emailInput = document.getElementById('emailInput');
  const email = emailInput.value;

  const templateParams = {
    to: email,
    from_name: 'Budget Buddy',
    reply_to: 'budgetbuddypuc@gmail.com',
    subject: 'Password Reset Request',
    html: `
      <p>Hello,</p>
      <p>We have received a password reset request for your Budget Buddy account. If you did not request a password reset, please ignore this email.</p>
      <p>To reset your password, please click the following link:</p>
      <a href="http://127.0.0.1:5500/reset-password?token=Hhki7cdXZOh4h3mQX&email=${email}">Reset Password</a>
      <p>If the link above does not work, please copy and paste the URL into your web browser.</p>
      <p>Best regards,</p>
      <p>The Budget Buddy Team</p>
    `
  };

  emailjs.send('service_n39vzid', 'template_nn6qzuc', templateParams)
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
      alert('Um e-mail de redefinição de senha foi enviado para o seu endereço de e-mail.');
      emailInput.value = '';
    }, (error) => {
      console.log('Error sending email:', error);
      alert('Ocorreu um erro ao enviar o e-mail de redefinição de senha. Por favor, tente novamente.');
    });
});

const textInput = document.getElementById('textInput');

textInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        window.location.href = 'confirmacao.html';
    }
});