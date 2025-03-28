<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { useGlobalState } from "~/utils/store";
import { computed } from 'vue';

const isDark = useDark()
const toggleDark = useToggle(isDark)
const { openAside } = useGlobalState()
onMounted(() => {
  const open = localStorage.getItem('openAside')
  openAside.value = open === 'true' || open === null
})
watch(openAside, (v) => {
  localStorage.setItem('openAside', v.toString())
})

function handleReload() {
  location.reload()
}

const iconName = computed(() => isDark.value ? 'i-heroicons-moon' : 'i-heroicons-sun')
</script>

<template>
  <header class="blur-global dark:bg-neutral-800 shadow h-16 fixed w-full z-30 rounded-b-lg">
    <UContainer class="h-full flex items-center">
      <IButton name="i-heroicons-bars-3-20-solid" @click="openAside = !openAside"
        :aria-label="openAside ? '关闭侧边栏' : '打开侧边栏'" role="button" />
      <h1 @click="handleReload" class="text-lg font-bold ml-2 hover:cursor-pointer">支持文字和画图的AI助手</h1>
      <IButton class="ml-auto" :name="iconName" @click="toggleDark()" :aria-label="isDark ? '切换到亮色模式' : '切换到暗色模式'"
        role="button" />
    </UContainer>
  </header>
</template>