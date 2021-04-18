import * as assert from 'assert'
import { handleResponse } from '../src/response'

describe('test/response.test.ts', () => {
  it('Should be the result of responding to JSON data.', async () => {
    const response = new Response(JSON.stringify({}), {
      headers: { 'content-type': 'application/json; charset=utf-8' }
    })

    const result = await handleResponse()(response)

    assert(typeof result.data === 'object')
  })

  it('Should be the result of responding to text data.', async () => {
    const response = new Response('ok')

    response.headers.delete('content-type')

    const result = await handleResponse()(response)

    assert(result.data === 'ok')
  })

  it('Should be the result of responding to stream data.', async () => {
    const response = new Response(Buffer.from(JSON.stringify({})), {
      headers: { 'content-type': 'application/octet-stream; charset=utf-8' }
    })

    const result = await handleResponse()(response)

    assert(typeof result.data === 'object')
  })
})
