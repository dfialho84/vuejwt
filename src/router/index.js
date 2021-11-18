import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import { buildCasLoginUrl } from '../shared/casUtils';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiredAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { requiredAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function isAuthenticated() {
  return store.getters["auth/isAuthenticated"];
}

function redirectToCas(route) {
  const casBaseUrl = process.env.VUE_APP_CAS_LOGIN;
  const service = window.location.protocol + "//" + window.location.host + route.fullPath;
  const casUrl = buildCasLoginUrl(casBaseUrl, service);
  window.location.href = casUrl;
}

function cameFromCas(route) {
  if("redirect" in route.query && "ticket" in route.query) {
    return true;
  }
}

function saveTicket(ticket) {
  store.dispatch('auth/saveTicket', ticket);
}

function processLogin(route) {
  if(cameFromCas(route)) {    
    const ticket = route.query.ticket;
    saveTicket(ticket);
    return true;    
  } else if(isAuthenticated()) {
    return true;
  } else {    
    redirectToCas(route);
  }  
}

router.beforeEach((to) => {  
  if(to.meta.requiredAuth) {
    return processLogin(to);
  }
  return true;
})

export default router
