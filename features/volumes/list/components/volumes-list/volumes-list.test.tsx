import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import VolumesList from '../volumes-list'
import 'whatwg-fetch'
import { SWRConfig } from 'swr'

const server = setupServer(
  rest.get('/volumes', (_, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'volume-1',
          size: 2,
          sizePretty: '106 MB',
          inUse: true,
          createTime: '26.10.1765',
        },
        {
          name: 'volume-2',
          size: 3,
          sizePretty: '107 MB',
          inUse: true,
          createTime: '27.10.1765',
        },
        {
          name: 'volume-3',
          size: 4,
          sizePretty: '108 MB',
          inUse: true,
          createTime: '28.10.1765',
        },
      ])
    )
  })
)

beforeAll(() => {
  process.env['NEXT_PUBLIC_API_URL'] = ''
  server.listen()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders values correctly', async () => {
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <VolumesList />
    </SWRConfig>
  )
  await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
  expect(screen.getByText('volume-1')).toBeInTheDocument()
  expect(screen.getByText('volume-2')).toBeInTheDocument()
  expect(screen.getByText('volume-3')).toBeInTheDocument()
})

test('renders no values message', async () => {
  server.use(
    rest.get('/volumes', (_, res, ctx) => {
      return res(ctx.json([]))
    })
  )
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <VolumesList />
    </SWRConfig>
  )
  await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
  expect(
    screen.getByText("Let's create your first volume.")
  ).toBeInTheDocument()
})

test('handles server error', async () => {
  server.use(
    rest.get('/volumes', (_, res, ctx) => {
      return res(ctx.status(500))
    })
  )
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <VolumesList />
    </SWRConfig>
  )
  await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
  expect(screen.getByText('Failed to fetch volumes')).toBeInTheDocument()
})
