export enum IncreaseType {
  Add,
  Multiply,
}

export type IncreaseOptions = {
  type: IncreaseType
  value: number
  frequence?: number
}

export class InvalidIncreaseTypeError {}

export default function increaseSpec(
  value: number,
  index: number,
  options: IncreaseOptions
): number {
  const frequence = options.frequence || 1
  if (index % frequence !== 0) {
    return value
  }
  if (options.type === IncreaseType.Add) {
    return value + options.value
  } else if (options.type === IncreaseType.Multiply) {
    return value * options.value
  } else {
    throw new InvalidIncreaseTypeError()
  }
}
