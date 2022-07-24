import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Image } from '../../../images/types'
import { Plan } from '../../../plans'
import dockerNames from 'docker-names'

export type CreateInstanceState = {
  name: string
  image?: Image
  plan?: Plan
}

const initialState: CreateInstanceState = {
  name: dockerNames.getRandomName(false).replaceAll('_', '-'),
}

const slice = createSlice({
  name: 'createInstance',
  initialState,
  reducers: {
    imageUpdated: (state, action: PayloadAction<Image>) => {
      state.image = action.payload
    },
    planUpdated: (state, action: PayloadAction<Plan>) => {
      state.plan = action.payload
    },
  },
})

export const { imageUpdated, planUpdated } = slice.actions

export default slice.reducer
