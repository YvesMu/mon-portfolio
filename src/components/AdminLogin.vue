<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginAdmin } from '@/api/airtable';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const isValid = await loginAdmin(email.value, password.value);
    if (isValid) {
      router.push('/admin');
    } else {
      error.value = 'Identifiants invalides';
    }
  } catch (e) {
    error.value = 'Erreur serveur';
  }
};
</script>

<template>
  <div class="login-container">
    <h2>Connexion Admin</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email admin" required />
      <input v-model="password" type="password" placeholder="Mot de passe" required />
      <button type="submit">Se connecter</button>
      <p v-if="error" class="error-msg">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
}
input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
button {
  width: 100%;
  padding: 0.75rem;
  background: #6e8efb;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}
button:hover {
  background: #587de2;
}
.error-msg {
  color: red;
  margin-top: 0.5rem;
}
</style>
