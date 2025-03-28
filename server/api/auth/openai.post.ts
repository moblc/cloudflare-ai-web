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
    let postUrl = ''
    let authKey = ''
    switch (openAIBody.model) {
        case 'gemini-1.5-flash-latest':
        case 'gemini-1.5-pro-latest':
        case 'gpt-4-turbo':
        case 'gpt-4o':
        case 'gpt-4o-mini':
        case 'spark':
        case 'kimi':
        case 'DeepSeek-R1':
            postUrl = `${process.env.api}/${endpoint}`
            authKey = `Bearer ${process.env.apikey}`
            break;
    }
    const res = await fetch(postUrl, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(openAIBody),
    })
    if (!res.ok) {
        return handleErr(res)
    }
    return streamResponse(res, openaiParser)
})
