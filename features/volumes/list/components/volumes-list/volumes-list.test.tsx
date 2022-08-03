import VolumesList from './index'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { SWRConfig } from 'swr'

const server = setupServer(
  rest.get(`/volumes`, (_, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.json([
        {
          name: 'volume-1',
          size: 180172544,
          sizePretty: '100 MB',
          inUse: true,
          createTime: '2021-01-07T14:36:14.000Z',
        },
        {
          name: 'volume-2',
          size: 180172545,
          sizePretty: '200 MB',
          inUse: true,
          createTime: '2021-02-07T14:36:14.000Z',
        },
        {
          name: 'volume-3',
          size: 180172546,
          sizePretty: '300 MB',
          inUse: true,
          createTime: '2021-03-07T14:36:14.000Z',
        },
      ])
    )
  })
)

describe('VolumesList', () => {
  beforeAll(() => {
    process.env['NEXT_PUBLIC_API_URL'] = ''
    server.listen()
  })
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('renders value correctly', async () => {
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

  it('shows expected no data message', async () => {
    server.use(
      rest.get(`/volumes`, (_, res, ctx) => {
        return res(ctx.delay(100), ctx.json([]))
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
})
