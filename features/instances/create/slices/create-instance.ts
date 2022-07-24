import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CreateInstanceState = {
  image: ActiveImage | null
  plan: string | null
}

const initialState: CreateInstanceState = {
  image: null,
  plan: null,
}

type ActiveImage = {
  id: string
  version: string
}

const slice = createSlice({
  name: 'createInstance',
  initialState,
  reducers: {
    imageUpdated: (state, action: PayloadAction<ActiveImage>) => {
      state.image = action.payload
    },
    planUpdated: (state, action: PayloadAction<string>) => {
      state.plan = action.payload
    },
  },
})

export const { imageUpdated, planUpdated } = slice.actions

export default slice.reducer
