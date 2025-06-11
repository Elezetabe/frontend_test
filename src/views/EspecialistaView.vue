<!-- src/views/EspecialistasView.vue -->
<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-6 text-blue-700 text-center">Lista de Especialistas</h2>

    <EspecialistaForm
      :especialistaEditar="especialistaEditar"
      @crear="crearEspecialista"
      @actualizar="actualizarEspecialistaForm"
      @cancelar="especialistaEditar = null"
    />

    <div class="overflow-x-auto mt-8">
      <table class="min-w-full border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th class="bg-blue-600 text-white px-6 py-3 rounded-tl-xl text-sm font-bold text-center">ID</th>
            <th class="bg-blue-600 text-white px-6 py-3 text-sm font-bold text-center">Nombre</th>
            <th class="bg-blue-600 text-white px-6 py-3 text-sm font-bold text-center">Especialidad</th>
            <th class="bg-blue-600 text-white px-6 py-3 text-sm font-bold text-center">Registro</th>
            <th class="bg-blue-600 text-white px-6 py-3 text-sm font-bold text-center">Días</th>
            <th class="bg-blue-600 text-white px-6 py-3 text-sm font-bold text-center">Horario</th>
            <th class="bg-blue-600 text-white px-6 py-3 text-sm font-bold text-center">Activo</th>
            <th class="bg-blue-600 text-white px-6 py-3 rounded-tr-xl text-sm font-bold text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(esp, idx) in especialistas"
            :key="esp.id"
            :class="idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
            class="shadow rounded-xl"
          >
            <td class="px-6 py-4 text-center font-semibold text-gray-800 border border-gray-200 rounded-l-xl">{{ esp.id }}</td>
            <td class="px-6 py-4 text-center text-gray-700 border border-gray-200">{{ esp.nombre_completo }}</td>
            <td class="px-6 py-4 text-center text-gray-700 border border-gray-200">{{ esp.especialidad }}</td>
            <td class="px-6 py-4 text-center text-gray-700 border border-gray-200">{{ esp.registro_profesional }}</td>
            <td class="px-6 py-4 text-center text-gray-600 border border-gray-200">{{ esp.dias || '-' }}</td>
            <td class="px-6 py-4 text-center text-gray-600 border border-gray-200">{{ esp.horarios || '-' }}</td>
            <td class="px-6 py-4 text-center border border-gray-200">
              <span
                :class="esp.activo
                  ? 'bg-green-200 text-green-800'
                  : 'bg-red-200 text-red-800'"
                class="inline-block px-4 py-1 rounded-full font-bold text-xs shadow"
              >
                {{ esp.activo ? 'Sí' : 'No' }}
              </span>
            </td>
            <td class="px-6 py-4 text-center border border-gray-200 rounded-r-xl">
              <button
                @click="editarEspecialista(esp)"
                class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-1 rounded-lg transition mr-2 shadow"
              >
                Editar
              </button>
              <button
                @click="eliminar(esp.id!)"
                class="inline-block bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-1 rounded-lg transition shadow"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import EspecialistaForm from '@/components/especialistaFormulario.vue'
import {
  enviarEspecialista,
  obtenerEspecialistas,
  actualizarEspecialista,
  eliminarEspecialista,
} from '@/service/especialista'

interface Especialista {
  id?: number
  nombre_completo: string
  especialidad: string
  registro_profesional: number
  dias: string // Ejemplo: "Lunes,Martes"
  horarios: string // Ejemplo: "8:00-12:00"
  activo: boolean
}

const especialistas = ref<Especialista[]>([])
const especialistaEditar = ref<Especialista | null>(null)

async function cargar() {
  const data = await obtenerEspecialistas()
  especialistas.value = data.map((esp: any) => ({
    id: esp.id,
    nombre_completo: esp.nombreCompleto,
    especialidad: esp.especialidad,
    registro_profesional: esp.registroProfesional,
    dias: esp.dias,
    horarios: esp.horarios,
    activo: esp.activo,
  }))
}

async function crearEspecialista(datos: Especialista) {
  try {
    await enviarEspecialista(datos)
    await cargar()
  } catch (error) {
    alert('Error al crear especialista. Revisa los datos o la consola.')
    console.error(error)
  }
}

function editarEspecialista(esp: Especialista) {
  especialistaEditar.value = { ...esp }
}

async function actualizarEspecialistaForm(id: number, datos: Especialista) {
  if (confirm('¿Actualizar especialista?'))
  await actualizarEspecialista(id, datos)
  especialistaEditar.value = null
  await cargar()
}

async function eliminar(id: number) {
  if (confirm('¿Eliminar especialista?')) {
    await eliminarEspecialista(id)
    await cargar()
  }
}

onMounted(cargar)
</script>

<style scoped>
/* Agrega aquí tus estilos personalizados, si es necesario */
</style>
