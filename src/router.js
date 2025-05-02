import { createRouter, createWebHistory } from 'vue-router';
import ProjectList from '@/components/ProjectList.vue';
import ProjectsControl from '@/views/ProjectsControl.vue';

const routes = [
  {
    path: '/',
    component: ProjectList,
    name: 'home',
  },
  {
    path: '/projet',
    component: ProjectsControl,
    name: 'projet',
    beforeEnter: (to, from, next) => {
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      if (isAdmin) {
        next();
      } else {
        next('/');
      }
    },
  }
];  


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
