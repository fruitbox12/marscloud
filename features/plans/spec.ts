export enum IncreaseType {
  Add,
  Multiply,
}

export type IncreaseOptions = {
  type: IncreaseType
  value: number
  frequency?: number
}

export class InvalidIncreaseTypeError extends Error {}

export default function increaseSpec(
  currentValue: number,
  index: number,
  options: IncreaseOptions
): number {
  const frequency = options.frequency || 1
  if (index % frequency !== 0) {
    return currentValue
  }
  if (options.type === IncreaseType.Add) {
    return currentValue + options.value
  } else if (options.type === IncreaseType.Multiply) {
    return currentValue * options.value
  } else {
    throw new InvalidIncreaseTypeError()
  }
}
