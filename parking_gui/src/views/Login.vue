<template>
   <form @submit.prevent="onSubmit">
    <div>{{ authStatus }}</div>

    <div>
      <authenticator variation="modal">
        <template v-slot="{ user, signOut }">
          <h1>Hello {{ user.username }}!</h1>
          <button @click="signOut">Salir</button>
        </template>
      </authenticator>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";
import { Hub, Logger  } from 'aws-amplify';  
import { toRefs } from 'vue';
import "@aws-amplify/ui-vue/styles.css";
import { useLoginStore } from "../stores/Reservations/LoginStore";

const LoginStore = useLoginStore();
const entrar = async () => {
   await LoginStore.enviar();
};
const salir = async () => {
   await LoginStore.salir();
};

const { authStatus } = toRefs(useAuthenticator());

const onSubmit = (event: Event) => {
  console.log("Ejecuto Evento on Submit");
  //Auth.signIn(
   // Object.fromEntries(new FormData(event.target as HTMLFormElement)) as any
  //);
};

interface ListenerInterface {
  payload: PayloadInterface
}

interface PayloadInterface {
  event: string
}

const logger = new Logger('My-Logger');
const listener = (data:ListenerInterface) => {
  switch (data.payload.event) {
    case 'configured':
      logger.info('the Auth module is configured');
      break;
    case 'signIn':
      logger.info('user signed in');
      entrar();
      console.log("paso Sigin");
      break;
    case 'signOut':
      logger.info('user signed out');
      salir();
      break;
    }
};
Hub.listen('auth', listener);

</script>