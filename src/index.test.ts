import { createHermes, IRequest } from './index'

interface IDefaultMeta {
  testMeta: string
}

function sendAFetch(path: string, request: IRequest<any, any>) {
  return handleFetch(path, request)
}

const { fetch, handleFetch, listen } = createHermes<IDefaultMeta>({
  transport: { fetch: sendAFetch },
  defaultMeta: { testMeta: 'test meta' },
})

listen<{}, { message: string }>('/test', async (request, response) => {
  response.body.message = 'yo'
  response.meta.testMeta = request.meta.testMeta
})

test('basic fetch', async () => {
  const response = await fetch<{ message: string }, any>('/test')
  expect(response.body.message).toBe('yo')
  expect(response.meta.isSuccess).toBe(true)
})

test('default meta', async () => {
  const response = await fetch<{ message: string }, any>('/test')
  expect(response.body.message).toBe('yo')
  expect(response.meta.testMeta).toBe('test meta')
  expect(response.meta.isSuccess).toBe(true)
})

test('add listener', async () => {
  listen('/test-2', async () => {})
})

test('add conflicting listener', async () => {
  expect(() => listen('/test', async () => {})).toThrowError()
})
