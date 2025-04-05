export default defineEventHandler(async (event) => {
  try {
    const res = await fetch(`${process.env.api}/v1/models`, {
      headers: {
        'Authorization': `Bearer ${process.env.apikey}`
      }
    })

    if (!res.ok) {
      throw createError({
        statusCode: res.status,
        statusMessage: await res.text()
      })
    }

    const data = await res.json() as OpenAIModelRes
    return data.data.map(model => ({
      id: model.id,
      name: model.id,
      provider: 'openai',
      endpoint: 'v1/chat/completions',
      type: 'chat'
    }))
  } catch (e) {
    console.error('Failed to fetch models:', e)
    return []
  }
})
