<template>
    <div class="admin-dashboard">
      <h1>Administration des Projets</h1>
      <div class="projects-list">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <h3>{{ project.Nom }}</h3>
          <label>
            <input 
              type="checkbox" 
              :checked="project.Publication" 
              @change="togglePublication(project.id, $event.target.checked)"
            >
            Publié
          </label>
        </div>
      </div>
      <button @click="logout" class="logout-btn">Déconnexion</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { base } from '@/api/airtable';
  
  const projects = ref([]);
  const router = useRouter();
  
  onMounted(async () => {
    projects.value = await base('Projets')
      .select({ sort: [{ field: 'Date de publication', direction: 'desc' }] })
      .all()
      .then(records => records.map(record => ({
        id: record.id,
        ...record.fields
      })));
  });
  
  const togglePublication = async (projectId, isPublished) => {
    await base('Projets').update([
      {
        id: projectId,
        fields: { Publication: isPublished }
      }
    ]);
  };
  
  const logout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/');
  };
  </script>
  
  <style scoped>
  .admin-dashboard {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
  }
  
  .projects-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
  }
  
  .project-card {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
  }
  
  .logout-btn {
    background: #ff4444;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>