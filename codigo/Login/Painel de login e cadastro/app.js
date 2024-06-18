const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});

// Função para salvar dados no localStorage
function saveUser(user) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

// Função para obter dados do localStorage
function getUser(email, senha) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  return users.find(user => user.email === email && user.senha === senha);
}

// Evento de registro
document.getElementById('sign-up-form').addEventListener('submit', function(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  let user = {
    nome: formData.get('nome'),
    sobrenome: formData.get('sobrenome'),
    dob: formData.get('dob'),
    email: formData.get('email'),
    senha: formData.get('senha'),
    notifications: formData.get('notifications') ? true : false
  };
  
  let users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.email === user.email)) {
    alert('Email já registrado');
  } else {
    saveUser(user);
    alert('Usuário registrado com sucesso');
    e.target.reset();
    main.classList.remove("sign-up-mode");
  }
});

// Evento de login
document.getElementById('sign-in-form').addEventListener('submit', function(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  let email = formData.get('email');
  let senha = formData.get('senha');

  let user = getUser(email, senha);
  if (user) {
    alert('Login bem-sucedido');
    window.location.href = '/codigo/backup-tela-principal/index.html';
  } else {
    alert('Email ou senha incorretos');
  }
});
