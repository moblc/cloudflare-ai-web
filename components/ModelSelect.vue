<script setup lang="ts">
import { imageGenModels, textGenModels, uniModals } from "~/utils/db";

const { t } = useI18n()
const { selectedModel, openModelSelect } = useGlobalState()
onMounted(() => {
  const model = localStorage.getItem('selectedModel')
  selectedModel.value = models.find(i => i.id === model) || uniModals[0]
})
watch(selectedModel, v => {
  localStorage.setItem('selectedModel', v.id)
})

const groups = computed(() => [
 {
    key: 'text generation',
    label: t('text_generation'),
    commands: textGenModels.map(i => ({
      id: i.id,
      label: i.name
    }))
  }, {
    key: 'image generation',
    label: t('image_generation'),
    commands: imageGenModels.map(i => ({
      id: i.id,
      label: i.name
    }))
  }])

function onSelect(option: { id: string }) {
  selectedModel.value = models.find(i => i.id === option.id) || textGenModels[0]
  openModelSelect.value = !openModelSelect.value
}
</script>

<template>
  <UModal v-model="openModelSelect">
    <UCommandPalette @update:model-value="onSelect" :groups="groups" :searchable="false" :model-value="selectedModel"
      :ui="{ group: { label: 'text-lg' } }" />
  </UModal>
</template>