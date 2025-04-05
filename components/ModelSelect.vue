<script setup lang="ts">
import { imageGenModels } from "~/utils/db";

const { t } = useI18n()
const { selectedModel, openModelSelect } = useGlobalState()
const backendModels = ref<Model[]>([])

onMounted(async () => {
  try {
    const savedModel = localStorage.getItem('selectedModel')
    // 获取后端OpenAI模型列表
    backendModels.value = await $fetch('/api/auth/models') as Model[]

    // 设置初始选中的模型
    if (savedModel) {
      const found = [...backendModels.value, ...imageGenModels].find(m => m.id === savedModel)
      selectedModel.value = found || backendModels.value[0] || imageGenModels[0]
    } else {
      selectedModel.value = backendModels.value[0] || imageGenModels[0]
    }
  } catch (e) {
    console.error('获取模型列表失败:', e)
    selectedModel.value = imageGenModels[0]
  }
})

const groups = computed(() => [
  {
    key: 'text generation',
    label: t('text_generation'),
    commands: backendModels.value.map(i => ({
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
  }
])

function onSelect(option: { id: string }) {
  selectedModel.value = [...backendModels.value, ...imageGenModels].find(i => i.id === option.id) || backendModels.value[0] || imageGenModels[0]
  openModelSelect.value = !openModelSelect.value
}
</script>

<template>
  <UModal v-model="openModelSelect">
    <UCommandPalette @update:model-value="onSelect" :groups="groups" :searchable="false" :model-value="selectedModel"
      :ui="{ group: { label: 'text-lg' } }" />
  </UModal>
</template>