<template>
  <MDBContainer>
    <MDBCard>
      <MDBCardHeader>
        <h5>Listado de reservaciones</h5>
      </MDBCardHeader>
      <MDBCardBody style="margin-bottom: 50px;">
        <MDBRow>
          <MDBCol col="2" class="d-flex mb-3">
            <MDBInput label="# Placa"
                      v-model="ReservationsStore.filterPlat"
                      style="text-transform: uppercase"
            />
          </MDBCol >
          <MDBCol col="10" class="d-flex flex-row-reverse mb-3">
            <MDBBtn color="primary"
                    aria-controls="modalForm"
                    @click="newForm()"
            >
              <i class="fas fa-plus"></i>
              Nueva reserva
            </MDBBtn>
          </MDBCol>
        </MDBRow>
        <div>
          <MDBTable class="align-middle mb-0 bg-white" responsive hover>
            <thead class="bg-light">
            <tr>
              <th>Placa</th>
              <th>Fecha</th>
              <th>Franja</th>
              <th>Ubicación</th>
              <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="reservation in ReservationsStore.filterTable()">
              <td>{{reservation.plat}}</td>
              <td v-text="reservation.Day" />
              <td v-text="ReservationsStore.transformShedule(reservation.Schedule)" />
              <td v-text="reservation.reservation_area" />
              <td>
                <MDBBtn color="success" size="sm" rounded @click="show(reservation.id)">
                  Editar
                </MDBBtn>
                <MDBBtn color="danger" size="sm" rounded @click="cancel(reservation.id)">
                  Cancelar
                </MDBBtn>
              </td>
            </tr>
            <tr v-if="ReservationsStore.textTableEmpty !== '' && ReservationsStore.filterTable().length === 0">
              <td colspan="5" class="text-center" v-text="ReservationsStore.textTableEmpty"></td>
            </tr>
            </tbody>
          </MDBTable>
        </div>
      </MDBCardBody>
    </MDBCard>
  </MDBContainer>

  <MDBModal
    size="lg"
    id="modalForm"
    tabindex="-1"
    labelledby="modalForm"
    v-model="ReservationsStore.modalForm"
  >
    <MDBModalHeader>
      <MDBModalTitle> {{ (ReservationsStore.action === 'create') ? 'Crear' : 'Editar' }} Reservación </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
      <FormReservation />
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="danger" @click="ReservationsStore.modalForm = false">
        <i class="far fa-times-circle"></i>
        Cerrar
      </MDBBtn>
      <MDBBtn color="primary" @click="save">
        <i class="fas fa-save"></i>
        Guardar
      </MDBBtn>
    </MDBModalFooter>
  </MDBModal>

</template>
 
<script setup lang="ts">
import {
  MDBTable,
  MDBBtn,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow
} from 'mdb-vue-ui-kit';
import FormReservation from './FormReservation.vue';
import { ref, onMounted } from "vue";
import { useReservationsStore } from "../../stores/Reservations/ReservationsStore";
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";

const ReservationsStore = useReservationsStore();

onMounted(() => {
  ReservationsStore.getAll();
});

const save = async () => {
  if (ReservationsStore.action === 'create') {
    await ReservationsStore.create();
  } else {
    await ReservationsStore.update();
  }
  await ReservationsStore.getAll();
};

const newForm = () => {
  ReservationsStore.action = 'create';
  ReservationsStore.resetForm();
  ReservationsStore.modalForm = true;
};

const show = async (id: number) => {
  await ReservationsStore.show(id);
  ReservationsStore.action = 'edit';
  ReservationsStore.modalForm = true;
  await ReservationsStore.getLocations();
};

const cancel = async (id: number) => {
  await ReservationsStore.cancel(id);
  ReservationsStore.action = 'create';
};

</script>

<style scoped>

</style>
