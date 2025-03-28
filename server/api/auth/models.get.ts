export default defineEventHandler(async (event) => {
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

  return res.json()
})
