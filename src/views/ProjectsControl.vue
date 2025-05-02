<script setup>
import { ref, onMounted } from 'vue';
import { getPublishedProjects } from '@/api/airtable';
import { updateProjectPublication } from '@/api/airtable.js';

const projects = ref([]);
const isLoading = ref(true);

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};


const loadProjects = async () => {
  try {

    const projets = await getPublishedProjects();  
    projects.value = projets;  
    isLoading.value = false;  
  } catch (error) {
    console.error('Erreur lors du chargement des projets :', error);
    isLoading.value = false;  
  }
};


const handleCheckboxChange = async (projectId, checked) => {
  try {

    await updateProjectPublication(projectId, checked);

  
    const project = projects.value.find((proj) => proj.id === projectId);
    if (project) {
      project.Publication = checked;
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la publication :', error);
  }
};

onMounted(loadProjects);

</script>

<template>
  <div class="projects-container">
    <h1 class="page-title">Projets Étudiants</h1>

    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Chargement en cours...</p>
    </div>

    <div v-else>
      <!-- Tableau des projets -->
      <table class="projects-table">
        <thead>
          <tr>
            <th>Nom du Projet</th>
            <th>Description</th>
            <th>Date de Publication</th>
            <th>Technologies</th>
            <th>Équipe</th>
            <th>Publier</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td>{{ project.Nom }}</td>
            <td>{{ project.Description }}</td>
            <td>{{ formatDate(project['Date de publication']) }}</td>
            <td>
              <div class="tech-tags">
                <span 
                  v-for="(tech, index) in Array.isArray(project.Technologies) ? project.Technologies : project.Technologies.split(',')" 
                  :key="index" 
                  class="tech-tag"
                >
                  {{ tech.trim() }}
                </span>
              </div>
            </td>
            <td>
              <div class="project-team-row">
                <span 
                  v-for="(student, index) in Array.isArray(project.NomEtudiant) ? project.NomEtudiant : [project.NomEtudiant]" 
                  :key="index" 
                  class="team-member"
                >
                  {{ student }}
                </span>
              </div>
            </td>
            <td>
         
              <label>
                <input 
                  type="checkbox" 
                  v-model="project.Publication" 
                  @change="handleCheckboxChange(project.id, project.Publication)"
                  :checked="project.Publication" 
                />
                Publier
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.projects-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.projects-table th, .projects-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.projects-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.tech-tags .tech-tag {
  display: inline-block;
  background-color: #e1e1e1;
  padding: 5px;
  margin-right: 5px;
  border-radius: 3px;
}

.project-team-row .team-member {
  display: inline-block;
  margin-right: 5px;
}
</style>
