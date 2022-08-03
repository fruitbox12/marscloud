import {
  fireEvent,
  getByText,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import VolumesTable from './volumes-table'
import { Volume } from '../../types'

const volumes: Volume[] = [
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
]

test('renders values correctly', () => {
  render(<VolumesTable volumes={volumes} />)
  expect(screen.getByText('volume-3')).toBeInTheDocument()
  expect(screen.getByText('4')).toBeInTheDocument()
  expect(screen.getByText('108 MB')).toBeInTheDocument()
  expect(screen.getByText('28.10.1765')).toBeInTheDocument()
})

test('opens modal onClick button', async () => {
  render(<VolumesTable volumes={volumes} />)
  const button = screen.getByRole('button', { name: 'menu-button-volume-1' })
  expect(button).toBeInTheDocument()
  fireEvent.click(button)
  await waitFor(() =>
    expect(screen.getByRole('menuitem', { name: 'menu-item-volume-1' }))
  )
  fireEvent.click(screen.getByRole('menuitem', { name: 'menu-item-volume-1' }))
  await waitFor(() =>
    expect(screen.getByText('Are you sure you want to delete this volume?'))
  )
})
