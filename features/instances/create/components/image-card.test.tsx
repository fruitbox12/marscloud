import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ImageCard from './image-card'
import { ImageGroup, ImageGroupId } from '../../../images'

const group: ImageGroup = {
  id: ImageGroupId.Ubuntu,
  name: 'Ubuntu',
  images: [
    {
      id: 'ubuntu/22.04-lts-x64',
      group: ImageGroupId.Ubuntu,
      name: 'Ubuntu',
      version: '22.04 (LTS) x64',
    },
    {
      id: 'ubuntu/21.10-x64',
      group: ImageGroupId.Ubuntu,
      name: 'Ubuntu',
      version: '21.10 x64',
    },
    {
      id: 'ubuntu/20.04-lts-x64',
      group: ImageGroupId.Ubuntu,
      name: 'Ubuntu',
      version: '20.04 (LTS) x64',
    },
    {
      id: 'ubuntu/18.04-lts-x64',
      group: ImageGroupId.Ubuntu,
      name: 'Ubuntu',
      version: '18.04 (LTS) x64',
    },
  ],
}

describe('ImageCard', () => {
  test('renders values correctly', () => {
    render(<ImageCard group={group} />)
    expect(screen.getByText(/ubuntu/i)).toBeInTheDocument()
    expect(screen.getByText(/select version/i)).toBeInTheDocument()
    expect(screen.getByText(group.images[0].version)).toBeInTheDocument()

    fireEvent.click(screen.getByText(/ubuntu/i))
  })
})
