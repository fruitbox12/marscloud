import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ImageCard from './image-card'
import { ImageGroup } from '../../../images'

const group: ImageGroup = {
  name: 'redis',
  images: [
    {
      id: 'redis/6',
      name: 'redis',
      tag: '6',
      size: 111616329,
      sizePretty: '111.62 MB',
      inUse: true,
      createTime: '1970-01-20T04:26:33.038Z',
    },
    {
      id: 'redis/7',
      name: 'redis',
      tag: '7',
      size: 111616329,
      sizePretty: '111.62 MB',
      inUse: true,
      createTime: '1970-01-20T04:26:33.038Z',
    },
  ],
}

describe('ImageCard', () => {
  it('renders correctly', () => {
    render(<ImageCard group={group} />)
    expect(screen.getByText(/redis/i)).toBeInTheDocument()
    expect(screen.getByText(/select version/i)).toBeInTheDocument()
    expect(screen.getByText(group.images[0].tag)).toBeInTheDocument()
  })
})
