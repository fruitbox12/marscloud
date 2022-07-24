import { Image } from '../images'
import { Plan } from '../plans'

export interface Instance {
  id: string
  name: string
  image: Image
  plan: Plan
}
