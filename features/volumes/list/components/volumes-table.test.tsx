import '@testing-library/jest-dom'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import VolumesTable from './volumes-table'
import { Volume } from '../../types'

const volumes: Volume[] = [
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
]

describe('VolumesTable', () => {
  it('renders value correctly', () => {
    render(<VolumesTable volumes={volumes} />)
    expect(screen.getByText(/volume-2/i)).toBeInTheDocument()
    expect(screen.getByText(/180172545/i)).toBeInTheDocument()
    expect(screen.getByText(/200 MB/i)).toBeInTheDocument()
    expect(screen.getByText(/2021-02-07T14:36:14.000Z/i)).toBeInTheDocument()
  })

  it('opens modal window onClick', async () => {
    render(<VolumesTable volumes={volumes} />)
    const button = screen.getByRole('button', { name: 'menu-button-volume-1' })
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    await waitFor(() => {
      expect(
        screen.getByRole('menuitem', { name: 'menu-item-volume-1' })
      ).toBeInTheDocument()
    })
    fireEvent.click(
      screen.getByRole('menuitem', { name: 'menu-item-volume-1' })
    )
    await waitFor(() => {
      expect(
        screen.getByText('Are you sure you want to delete this volume?')
      ).toBeInTheDocument()
    })
  })
})
