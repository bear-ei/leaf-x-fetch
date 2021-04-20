import * as assert from 'assert'
import { checkStatus } from '../src/status'

describe('test/status.test.ts', () => {
  it('Should be the correct response status code result.', async () => {
    const response = { ok: true } as Response
    const result = checkStatus(response)

    assert(result.ok)
  })

  it('Should be the result of an error response status code.', async () => {
    try {
      const response = {
        ok: false,
        statusText: 'Internal service error.'
      } as Response

      checkStatus(response)
    } catch (error) {
      assert(error.response.ok === false)
      assert(error.response.statusText === 'Internal service error.')
    }
  })
})