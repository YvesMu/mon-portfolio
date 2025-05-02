<script setup>
import { onMounted, ref } from 'vue';
import { getPublishedProjects } from '@/api/airtable'; 
import { incrementLike } from '@/api/airtable';

const projects = ref([]);
const isLoading = ref(true);


onMounted(async () => {
  try {
   
    const allProjects = await getPublishedProjects();
    
    
    projects.value = allProjects.filter(project => project.Publication === true);
  } catch (e) {
    console.error('Erreur:', e);
  } finally {
    isLoading.value = false;
  }
});


const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

const handleLike = async (project) => {
  try {
    const newLikes = await incrementLike(project.id, project.Likes || 0);
    project.Likes = newLikes;
  } catch (error) {
    console.error('Erreur lors du like :', error);
  }
};

const searchTech = ref('');

import { computed } from 'vue';

const filteredProjects = computed(() => {
  const keyword = searchTech.value.trim().toLowerCase();

  if (!keyword) return projects.value;

  return projects.value.filter(project => {
    const techs = Array.isArray(project.Technologies)
      ? project.Technologies
      : project.Technologies?.split(',') || [];

    return techs.some(tech => tech.trim().toLowerCase() === keyword);
  });
});



</script>


<template>
  <br>
  <div class="search-bar">
  <input
    type="text"
    v-model="searchTech"
    placeholder="Rechercher une technologie (ex: HTML)"
  />
</div>


  <div class="projects-container">
    <h1 class="page-title">Projets Étudiants</h1>
    
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Chargement en cours...</p>
    </div>
    
    <div v-else class="projects-list">
      <div v-for="project in filteredProjects" :key="project.id" class="project-card">
        <div class="project-image-container">
          <img 
            v-if="project.Visuels && project.Visuels.length > 0" 
            :src="project.Visuels[0].thumbnails.large.url" 
            :alt="project.Visuels[0].filename"
            class="project-image"
          />
          <div v-else class="image-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>
            </svg>
          </div>
        </div>
        
        <div class="card-header">
          <h2 class="project-name">{{ project.Nom }}</h2>
          <div class="project-meta">
            <span class="publication-date">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
              </svg>
              {{ formatDate(project['Date de publication']) }}
            </span>
          </div>
        </div>
        <div class="card-body">
          <p class="project-description">{{ project.Description }}</p>

          <div class="tech-stack">
            <h3>Technologies :</h3>
            <div class="tech-tags">
              <span 
                v-for="(tech, index) in Array.isArray(project.Technologies) ? project.Technologies : project.Technologies.split(',')" 
                :key="index" 
                class="tech-tag"
              >
                {{ tech.trim() }}
              </span>
            </div>
          </div>
          
          <div class="project-team-wrapper">
            <h3>Équipe :</h3>
            <div class="project-team-row">
              <span 
                v-for="(student, index) in Array.isArray(project.NomEtudiant) ? project.NomEtudiant : [project.NomEtudiant]" 
                :key="index" 
                class="team-member"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                {{ student }}
              </span>
            </div>
                      <div class="like-button-wrapper">
  <button 
    @click="handleLike(project)" 
    class="like-button"
  >
    👍 J'aime ({{ project.Likes || 0 }})
  </button>
</div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

.projects-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 80em;
}

.page-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.projects-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

@media (min-width: 1024px) {
  .projects-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

.project-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
}

.project-image-container {
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  position: relative;
  background: #f5f5f5;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e0e0e0;
  color: #999;
}

.image-placeholder svg {
  width: 50px;
  height: 50px;
  fill: currentColor;
}

.card-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
}

.project-name {
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
}

.project-meta {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.9;
}

.project-meta svg {
  margin-right: 0.5rem;
}

.card-body {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-description {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.tech-stack {
  margin-bottom: 1.5rem;
}

.tech-stack h3 {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: #2c3e50;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: #f0f0f0;
  color: #333;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.project-team-wrapper {
  margin-top: auto;
}

.project-team-wrapper h3 {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: #2c3e50;
}

.project-team-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.team-member {
  display: inline-flex;
  align-items: center;
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  color: black;
  white-space: nowrap;
}

.team-member svg {
  margin-right: 0.5rem;
  color: #6e8efb;
}

.like-button-wrapper {
  margin-top: 1.5rem;
}

.like-button {
  background-color: #6e8efb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.like-button:hover {
  background-color: #587de2;
}
.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.search-bar input {
  width: 100%;
  max-width: 400px;
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

</style>