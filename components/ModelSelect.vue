<script setup lang="ts">
const { t } = useI18n()
const { selectedModel, openModelSelect, models } = useGlobalState()

async function fetchModels() {
  try {
    const res = await fetch('/api/auth/models')
    if (res.ok) {
      const data = await res.json() as ModelResponse
      models.value = data.data.map(m => ({
        id: m.id,
        name: m.id,
        provider: 'openai',
        type: m.id.includes('image') ? 'text-to-image' : 'chat',
        endpoint: 'v1/chat/completions'
      }))

      const savedModel = localStorage.getItem('selectedModel')
      selectedModel.value = models.value.find(i => i.id === savedModel) || models.value[0]
    }
  } catch (error) {
    console.error('获取模型列表失败:', error)
  }
}

onMounted(fetchModels)

const groups = computed(() => [{
  key: 'text generation',
  label: t('text_generation'),
  commands: models.value
    .filter(m => m.type === 'chat')
    .map(i => ({
      id: i.id,
      label: i.name
    }))
}, {
  key: 'image generation',
  label: t('image_generation'),
  commands: models.value
    .filter(m => m.type === 'text-to-image')
    .map(i => ({
      id: i.id,
      label: i.name
    }))
}])

function onSelect(option: { id: string }) {
  selectedModel.value = models.value.find(i => i.id === option.id) || models.value[0]
  openModelSelect.value = !openModelSelect.value
}
</script>

<template>
  <UModal v-model="openModelSelect">
    <UCommandPalette @update:model-value="onSelect" :groups="groups" :searchable="false" :model-value="selectedModel"
      :ui="{ group: { label: 'text-lg' } }" />
  </UModal>
</template>