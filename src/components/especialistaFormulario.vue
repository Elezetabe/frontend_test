<!-- src/components/EspecialistaForm.vue -->
<template>
  <form
    @submit.prevent="onSubmit"
    class="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8 space-y-6"
  >
    <h3 class="text-2xl font-bold text-blue-700 mb-6 text-center">
      {{ isEditMode ? 'Editar' : 'Crear' }} Especialista
    </h3>

    <div class="flex flex-col gap-1">
      <label class="font-semibold text-gray-700">Nombre completo:</label>
      <input
        v-model="localForm.nombre_completo"
        type="text"
        required
        class="input focus:ring-2 focus:ring-blue-400"
        placeholder="Ejemplo: Juan Pérez"
      />
    </div>

    <div class="flex flex-col gap-1">
      <label class="font-semibold text-gray-700">Especialidad:</label>
      <input
        v-model="localForm.especialidad"
        type="text"
        required
        class="input focus:ring-2 focus:ring-blue-400"
        placeholder="Ejemplo: Cardiología"
      />
    </div>

    <div class="flex flex-col gap-1">
      <label class="font-semibold text-gray-700">Registro profesional:</label>
      <input
        v-model.number="localForm.registro_profesional"
        type="number"
        required
        class="input focus:ring-2 focus:ring-blue-400"
        placeholder="Ejemplo: 123456"
      />
    </div>

    <div class="flex flex-col gap-1">
      <label class="font-semibold text-gray-700">Días:</label>
      <div class="flex flex-wrap gap-2">
        <label
          v-for="dia in diasSemana"
          :key="dia"
          class="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded shadow-sm cursor-pointer"
        >
          <input type="checkbox" :value="dia" v-model="diasSeleccionados" class="accent-blue-600" />
          <span class="text-gray-700 text-sm">{{ dia }}</span>
        </label>
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <label class="font-semibold text-gray-700">Horario:</label>
      <input
        v-model="localForm.horario"
        type="text"
        required
        class="input focus:ring-2 focus:ring-blue-400"
        placeholder="Ejemplo: 12:30-2:30"
      />
    </div>

    <div class="flex items-center gap-2">
      <input
        v-model="localForm.activo"
        type="checkbox"
        id="activo"
        class="accent-blue-600 w-5 h-5"
      />
      <label for="activo" class="font-semibold text-gray-700 select-none">Activo</label>
    </div>

    <div class="flex gap-4 justify-center mt-6">
      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
      >
        {{ isEditMode ? 'Actualizar' : 'Crear' }}
      </button>
      <button
        v-if="isEditMode"
        type="button"
        @click="cancelarEdicion"
        class="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
      >
        Cancelar
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

interface EspecialistaForm {
  id?: number
  nombre_completo: string
  especialidad: string
  registro_profesional: number
  dias: string
  horario: string
  activo: boolean
}

const props = defineProps<{
  especialistaEditar: EspecialistaForm | null
}>()

const emit = defineEmits(['crear', 'actualizar', 'cancelar'])

const localForm = ref<EspecialistaForm>({
  nombre_completo: '',
  especialidad: '',
  registro_profesional: 0,
  dias: '',
  horario: '',
  activo: true,
})

const isEditMode = ref(false)

watch(
  () => props.especialistaEditar,
  (nuevo) => {
    if (nuevo) {
      localForm.value = { ...nuevo }
      diasSeleccionados.value = nuevo.dias ? nuevo.dias.split(',') : []
      isEditMode.value = true
    }
  },
  { immediate: true },
)

function onSubmit() {
  const datos = { ...localForm.value, dias: diasSeleccionados.value.join(',') }
  if (isEditMode.value && props.especialistaEditar?.id) {
    emit('actualizar', props.especialistaEditar.id, datos)
  } else {
    emit('crear', datos)
  }
  resetForm()
}

function cancelarEdicion() {
  emit('cancelar')
  resetForm()
}

function resetForm() {
  localForm.value = {
    nombre_completo: '',
    especialidad: '',
    registro_profesional: 0,
    dias: '',
    horario: '',
    activo: true,
  }
  diasSeleccionados.value = []
  isEditMode.value = false
}

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const diasSeleccionados = ref<string[]>([])

watch(diasSeleccionados, (nuevosDias) => {
  localForm.value.dias = nuevosDias.join(', ')
})
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.6rem 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 0.5rem;
  outline: none;
  font-size: 1rem;
  background: #f8fafc;
  transition: border 0.2s;
}
.input:focus {
  border-color: #2563eb;
  background: #fff;
}
</style>
