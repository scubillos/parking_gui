import { defineStore } from "pinia";
import axiosHttp from '../../utils/axios'
import {
    Login,
  LoginResponse
} from "./LoginInterfaces";
import {toast} from "vue3-toastify";
import router from "../../router";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import { toRefs } from 'vue';

export const useLoginStore = defineStore('loginStore', {
  state: () => {
    return {
      action: 'create' as string,
      login: {} as     Login,
      olvido: false as boolean,
      islogged: false as boolean,
      maxuser: 38 as number,
      maxpwd: 18 as number
    }
  },

  actions: {

    // Validations
    async sesion_valida(): Promise<boolean> {      
      const { authStatus } = toRefs(useAuthenticator());
      //const isAuthenticated = computed(() => authStatus.value === 'authenticated');
      if (authStatus.value === 'authenticated'){
        return true
      }else{
        toast.success("Acceso denegado");
        router.replace({path:"/"});
        return false
      }     
    },
    // CRUD
    async enviar(): Promise<void> {       
        setTimeout(function(){
          toast.success("Ingreso exitoso");
          router.replace({path:"reservas"});
        },200) ; 
    },

    async salir(): Promise<void> {
      toast.success("Ha Salido del Sistema");
      router.replace({path:"/"});
    }
  }
});
