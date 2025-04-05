import { createGlobalState } from "@vueuse/shared"
import { ref } from "vue"
import { uniModals } from "./db"

export const useGlobalState = createGlobalState(() => {
    const openModelSelect = ref(false)
    const passModal = ref(false)
    const openAside = ref(false)
    const openSettings = ref(false)
    const selectedModel = ref({
        id: '',
        name: '',
        provider: 'openai' as const,
        type: 'chat' as const,
        endpoint: 'v1/chat/completions'
    })

    return {
        openModelSelect,
        passModal,
        openAside,
        openSettings,
        selectedModel
    }
})