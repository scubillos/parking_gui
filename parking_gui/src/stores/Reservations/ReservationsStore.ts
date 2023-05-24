import { defineStore } from "pinia";
import axiosHttp from '../../utils/axios'
import {
  ReservationRow,
  Reservation,
  ReservationsResponse,
  Schedule,
  Location
} from "./ReservationsInterfaces";
import {toast} from "vue3-toastify";


export const useReservationsStore = defineStore('reservationsStore', {
  state: () => {
    return {
      action: 'create' as string,
      id_reservation: 0 as number,
      reservation_list: [] as ReservationRow[],
      schedules: [] as Schedule[],
      locations: [] as Location[],
      modalForm: false as boolean,
      textTableEmpty: '' as string,
      filterPlat: '' as string,
      form: {} as Reservation
    }
  },

  actions: {
    async getAll(): Promise<void> {
      this.textTableEmpty = 'Cargando registros, por favor espere...';
      //const response = await axiosHttp.get('/reservations');
      const response = await axiosHttp.get('/vehiculos');
      
      this.reservation_list = response.data.data;
      if (this.reservation_list.length === 0) {
        this.textTableEmpty = 'No hay registros disponibles';
      } else {
        this.textTableEmpty = '';
      }
      this.modalForm = false;
    },

    async getLocations(): Promise<void> {
      this.locations = [] as Location[];

      if (this.form.schedule_day && this.form.schedule) {
        this.locations.push({
          id: 0,
          text: 'Cargando...'
        });
        this.form.location_id = 0;

        const response = await axiosHttp.get(`/locations/date/${this.form.schedule_day}/schedule/${this.form.schedule}`);
        this.locations = [] as Location[];
        response.data.data.forEach((row : object) => {
          this.locations.push({
            id: row.id,
            text: `${row.parking_area} ${row.parking_number}`
          });
        });

        if (this.action === 'edit' && !this.locations.filter((location : Location) => location.id === this.form.location_id)) {
          this.locations.push({
            id: this.form.location_id,
            text: 'TODO: parking_area parking_number'
          });
        }

      } else {
        this.locations.push({
          id: 0,
          text: `Seleccione día y horario primero`
        });
      }
    },

    getSchedules(): void {
      this.schedules = [
        { id: 'morning', text: 'Mañana' },
        { id: 'afternoon', text: 'Tarde' },
        { id: 'day', text: 'Día completo' },
      ];
    },

    transformShedule(id_schedule: string): string {
      if (this.schedules.length === 0) {
        this.getSchedules();
      }
      let filter = this.schedules.filter((schedule: Schedule) => { return schedule.id === id_schedule });
      return filter[0].text;
    },

    resetForm(): void {
      this.action = 'create';
      this.form = {} as Reservation;
    },

    // Validations
    async vehicleByPlat(plat: string): Promise<boolean> {
      const response = await axiosHttp.get(`/vehicle/plat/${plat}`);
      return plat === response.data.data.plat_number;
    },

    // CRUD
    async create(): Promise<void> {
      const response = await axiosHttp.post('/reservation', this.form);
      if (response.data.success) {
        toast.success("Reservación creada exitosamente");
      }
    },

    async update(): Promise<void> {
      const response = await axiosHttp.put(`/reservation/${this.form.id}`, this.form);
      toast.success("Reservación actualizada exitosamente");
    },

    async show(id: number): Promise<void> {
      const response = await axiosHttp.get(`/reservation/${id}`);
      this.form = response.data.data;
    },

    async cancel(id: number): Promise<void> {
      const response = await axiosHttp.delete(`/reservation/${id}`);
      if (response.status === 204) {
        toast.success("Reservación cancelada correctamente");
        await this.getAll();
      }
    },

    filterTable() {
      if (this.filterPlat !== '') {
        this.filterPlat = this.filterPlat.toUpperCase();
      }
      let filtered = this.reservation_list.filter(reservation => reservation.plat.includes(this.filterPlat));
      if (filtered.length === 0 && this.filterPlat !== '') {
        this.textTableEmpty = 'No se encontraron registros';
      } else if (this.filterPlat !== '') {
        this.textTableEmpty = '';
      }
      return filtered;
    }
  }
});
