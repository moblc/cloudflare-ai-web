import { handleErr, openaiParser, streamResponse } from "~/utils/helper";
import { OpenAIBody, OpenAIReq } from "~/utils/types";

export default defineEventHandler(async (event) => {
    const body: OpenAIReq = await readBody(event)
    const { model, endpoint, messages, key } = body

    const openAIBody: OpenAIBody = {
        stream: true,
        model,
        messages,
    }

    // 获取模型的API URL和认证信息
    let postUrl = `${process.env.api}/${endpoint}`
    let authKey = key === undefined ? `Bearer ${process.env.apikey}` : `Bearer ${key}`

    const res = await fetch(postUrl, {
        method: 'POST',
        headers: {
            Authorization: authKey,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(openAIBody),
    })

    if (!res.ok) {
        return handleErr(res)
    }

    return streamResponse(res, openaiParser)
})
