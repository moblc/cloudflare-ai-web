import { createGlobalState } from "@vueuse/shared"
import { ref } from "vue"

const defaultModel: Model = {
    id: 'default',
    name: '加载中...',
    provider: 'openai',
    type: 'chat'
}

export const useGlobalState = createGlobalState(() => {
    const openModelSelect = ref(false)
    const passModal = ref(false)
    const openAside = ref(false)
    const openSettings = ref(false)
    const selectedModel = ref(defaultModel)
    const models = ref<Model[]>([])

    return {
        openModelSelect,
        passModal,
        openAside,
        openSettings,
        selectedModel,
        models
    }
})