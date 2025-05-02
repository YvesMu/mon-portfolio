<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const showModal = ref(false);
const isAuthenticated = ref(false);

const ADMIN_EMAIL = 'yvesmu@yahoo.com';
const ADMIN_PASSWORD = 'c123456789';

const router = useRouter();

onMounted(() => {
  isAuthenticated.value = localStorage.getItem('isAdmin') === 'true';
});

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handleLogin = () => {
  const enteredEmail = email.value.trim().toLowerCase();
  const enteredPassword = password.value.trim();

  if (!enteredEmail || !enteredPassword) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  if (
    enteredEmail === ADMIN_EMAIL.trim().toLowerCase() &&
    enteredPassword === ADMIN_PASSWORD
  ) {
    isAuthenticated.value = true;
    localStorage.setItem('isAdmin', 'true');
    closeModal();
    console.log('Connexion réussie');
    router.push('/projet');
  } else {
    alert('Identifiants incorrects');
  }
};

const logout = () => {
  localStorage.removeItem('isAdmin');
  isAuthenticated.value = false;
  router.push('/');
};
</script>

<template>
  <header class="navbar">
    <div class="container">
      <h1 class="logo">PortFolio des Etudiants</h1>
      <nav class="nav-buttons">
        <button v-if="!isAuthenticated" @click="openModal">Connexion Admin</button>
        <div v-else class="auth-info">
          <span class="admin-label">👑 Admin</span>
          <button @click="logout">Se déconnecter</button>
        </div>
      </nav>
    </div>
  </header>


  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h2>Connexion Administrateur</h2>

      <form @submit.prevent="handleLogin">
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Se connecter</button>
      </form>

      <button class="close-btn" @click="closeModal">Fermer</button>
    </div>
  </div>
</template>

<style scoped>



.navbar {
  background: linear-gradient(90deg, #667eea, #764ba2);
  padding: 16px 0;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;
}

.nav-buttons button {
  background-color: white;
  color: #5a67d8;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-buttons button:hover {
  background-color: #edf2f7;
}

.auth-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-label {
  font-weight: 500;
  background-color: #4c51bf;
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 14px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
}

form div {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 15px;
}

.modal-content button {
  margin-top: 10px;
  background-color: #5a67d8;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #434190;
}

.close-btn {
  margin-top: 10px;
  background-color: #e53e3e;
}

.close-btn:hover {
  background-color: #c53030;
}
</style>
