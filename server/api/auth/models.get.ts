export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const res = await fetch(`${config.api}/v1/models`, {
    headers: {
      'Authorization': `Bearer ${config.apikey}`
    }
  })

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: await res.text()
    })
  }

  return res.json()
})
