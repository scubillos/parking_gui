<template>
  <MDBContainer>
    <MDBRow>
      <MDBCol cols="1" />
      <MDBCol cols="10" class="mt-5 text-center">
        <h3>En desarrollo</h3>
        <p>Sitio en construcción.</p>
        <div>
          <img src="public/in-dev.jpg" width="200">
        </div>
      </MDBCol>
      <MDBCol cols="1" />
    </MDBRow>
  </MDBContainer>
</template>

<script setup lang="ts">
import {
  MDBContainer,
  MDBRow,
  MDBCol
} from "mdb-vue-ui-kit";
</script>

<style scoped>

</style>


router.beforeEach((to, from, next) => {
    const isLoggedIn =to.params.islogged  // Aquí debes implementar la lógica para verificar si el usuario está logueado
  
    if (to.matched.some(route => route.meta.requiresAuth) && !isLoggedIn) {
      // Si la ruta requiere autenticación y el usuario no está logueado, redirigir al componente de inicio de sesión
      next('/login');
    } else {
      // Si el usuario está logueado o la ruta no requiere autenticación, permitir el cambio de URL
      next();
    }
  });

  
