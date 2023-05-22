<template>
  <authenticator variation="modal">
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Esta Seguro que desea cerrar la Sesion?</button>
    </template>
  </authenticator>
</template>
<script setup>
  import { Authenticator } from "@aws-amplify/ui-vue";
  import "@aws-amplify/ui-vue/styles.css";
</script>