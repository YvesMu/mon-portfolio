<template>
    <div class="login-container">
      <h2>Connexion Admin</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="password" type="password" placeholder="Mot de passe" required>
        <button type="submit">Se connecter</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { base } from '@/api/airtable';
  
  const email = ref('yvesmu@yahoo.com');
  const password = ref('c123456789');
  const error = ref('');
  const router = useRouter();
  
  const handleLogin = async () => {
    try {
      const records = await base('Projets')
        .select({
          filterByFormula: `AND({EmailAdmin} = '${email.value}', {MDP_ADMIN} = '${password.value}')`,
          maxRecords: 1
        })
        .firstPage();
  
      if (records.length > 0) {
        localStorage.setItem('isAdmin', 'true');
        router.push('/admin');
      } else {
        error.value = 'Identifiants incorrects';
      }
    } catch (err) {
      error.value = 'Erreur de connexion';
      console.error(err);
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  input {
    display: block;
    width: 100%;
    padding: 0.5rem;
    margin: 1rem 0;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    background: #42b983;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }
  
  .error {
    color: red;
    margin-top: 1rem;
  }
  </style>