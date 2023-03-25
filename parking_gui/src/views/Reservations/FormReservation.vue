<template>
  <form>
    <!-- 2 column grid layout with text inputs for the first and last names -->
    <MDBRow class="mb-2">
      <MDBCol col="6">
        <label>Placa</label>
        <input
          class="form-control"
          type="text"
          id="form_plat_number"
          v-model="ReservationsStore.form.plat_number"
        />
      </MDBCol>
    </MDBRow>
    <MDBRow class="mb-2">
      <MDBCol col="6">
        <label>Fecha de reserva</label>
        <input
          class="form-control"
          type="date"
          id="form_schedule_day"
          @change="filterLocations"
          v-model="ReservationsStore.form.schedule_day"
        />
      </MDBCol>

      <MDBCol col="6">
        <label>Franja</label>
        <select
          aria-label="Franja"
          class="form-control"
          id="form_schedule"
          @change="filterLocations"
          v-model="ReservationsStore.form.schedule"
        >
          <option v-for="schedule in ReservationsStore.schedules" :value="schedule.id" v-text="schedule.text" />
        </select>
      </MDBCol>
    </MDBRow>
    <MDBRow class="mb-2">
      <MDBCol col="6">
        <label>Ubicación</label>
        <select
          aria-label="Franja"
          class="form-control"
          id="form_location_id"
          v-model="ReservationsStore.form.location_id"
        >
          <option v-for="location in ReservationsStore.locations" :value="location.id" v-text="location.text" />
        </select>
      </MDBCol>
    </MDBRow>

  </form>
</template>

<script setup lang="ts">
import {
  MDBRow,
  MDBCol,
} from "mdb-vue-ui-kit";

import { toast } from "vue3-toastify";
import { useReservationsStore } from "../../stores/Reservations/ReservationsStore";
import { onMounted } from "vue";
const ReservationsStore = useReservationsStore();

onMounted(() => {
  ReservationsStore.getSchedules();
});

const handleDate = function () {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let now = `${year}-${month}-${day}`;

  const schedule_day = new Date(now);
  const min_date = new Date(ReservationsStore.form.schedule_day);

  if (schedule_day < min_date) {
    ReservationsStore.form.schedule_day = now;
    toast.error('La fecha no debe ser anterior al día de hoy');
  } else {
    filterLocations();
  }
}

const filterLocations = async function () {
  await ReservationsStore.getLocations();
}

</script>

<style scoped>

</style>
