import { defineStore } from "pinia";
import axiosHttp from '../../utils/axios'
import {
    Login,
  LoginResponse
} from "./LoginInterfaces";
import {toast} from "vue3-toastify";
import router from "../../router";
import { Auth } from 'aws-amplify';

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
    async vehicleByPlat(plat: string): Promise<boolean> {
      const response = await axiosHttp.get(`/vehicle/plat/${plat}`);
      return plat === response.data.data.plat_number;
    },
    // CRUD
    async enviar(): Promise<void> {       

      //const response = await axiosHttp.post('/auth/login', this.login);
      //if (response.data.success) {
        toast.success("Ingreso exitoso");
        this.islogged = true;
        try {
          const user = await Auth.signIn( this.login.user, this.login.pwd);
        } catch (error) {
        console.log('error signing in', error);
        }
        //router.replace({path:"reservas", query: {prueba: this.islogged }});
      //}
    },

    async update(): Promise<void> {
      //const response = await axiosHttp.put(`/reservation/${this.form.id}`, this.form);
      toast.success("Reservación actualizada exitosamente");
    }
  }
});
