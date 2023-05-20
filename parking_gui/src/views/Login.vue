<template>
  <form class="align-middle mb-0 container-sm">
    <!-- Email input -->
    <MDBInput
      type="email"
      label="Usuario"
      v-bind:maxlength="LoginStore.maxuser"
      id="form1Email"
      v-model="LoginStore.login.user"
      wrapperClass="mb-4"
    />
    <!-- Password input -->
    <MDBInput
      type="password"
      label="Contraseña"
      id="form1Password"
      v-bind:maxlength="LoginStore.maxpwd"
      v-model="LoginStore.login.pwd"
      wrapperClass="mb-4"
    />
    <!-- 2 column grid layout for inline styling -->
    <MDBRow class="mb-4">
      <MDBCol class="d-flex justify-content-center">
        <!-- Checkbox -->
        <MDBCheckbox
          label="Recuperar Contraseña"
          id="form1LoginCheck"
          v-model="LoginStore.olvido"
          wrapperClass="mb-3 mb-md-0"
        />
      </MDBCol>
      <MDBCol>
        <!-- Simple link -->
        <a href="#!">Olvido contraseña?</a>
      </MDBCol>
    </MDBRow>
    <!-- Submit button -->
    <MDBBtn color="primary" block @click="entrar"> Iniciar Sesión</MDBBtn>
  </form>
</template>

<script setup lang="ts">
import { 
  MDBInput,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBCol,
 } from "mdb-vue-ui-kit";
 import { useLoginStore } from "../stores/Reservations/LoginStore";

 const LoginStore = useLoginStore();
 const entrar = async () => {
    await LoginStore.enviar();
};
</script>