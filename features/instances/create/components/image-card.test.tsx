import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ImageCard from './image-card'
import { ImageGroup, ImageGroupId } from '../../../images'

const group: ImageGroup = {
  name: 'Ubuntu',
  images: [
    {
      id: 'ubuntu/22.04-lts-x64',
      name: ImageGroupId.Ubuntu,
      tag: '22.04 (LTS) x64',
      size: 111616329,
      sizePretty: '111.62 MB',
      inUse: true,
      createTime: '1970-01-20T04:26:33.038Z',
    },
    {
      id: 'ubuntu/21.10-x64',
      name: ImageGroupId.Ubuntu,
      tag: '21.10 x64',
      size: 111616329,
      sizePretty: '111.62 MB',
      inUse: true,
      createTime: '1970-01-20T04:26:33.038Z',
    },
    {
      id: 'ubuntu/20.04-lts-x64',
      name: ImageGroupId.Ubuntu,
      tag: '20.04 (LTS) x64',
      size: 111616329,
      sizePretty: '111.62 MB',
      inUse: true,
      createTime: '1970-01-20T04:26:33.038Z',
    },
    {
      id: 'ubuntu/18.04-lts-x64',
      name: ImageGroupId.Ubuntu,
      tag: '18.04 (LTS) x64',
      size: 111616329,
      sizePretty: '111.62 MB',
      inUse: true,
      createTime: '1970-01-20T04:26:33.038Z',
    },
  ],
}

describe('ImageCard', () => {
  test('renders values correctly', () => {
    render(<ImageCard group={group} />)
    expect(screen.getByText(/ubuntu/i)).toBeInTheDocument()
    expect(screen.getByText(/select version/i)).toBeInTheDocument()
    expect(screen.getByText(group.images[0].tag)).toBeInTheDocument()

    fireEvent.click(screen.getByText(/ubuntu/i))
  })
})
