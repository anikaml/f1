import { type combinedRaceCircuit, CombinedRaceCircuitPropertyEnum } from '../libs/interfaces'

type resultType = Record<string, number>

interface resultArrayType {
  name: string
  value: number
}

export function getProperty(element: combinedRaceCircuit, property: CombinedRaceCircuitPropertyEnum): string {
  if (property === CombinedRaceCircuitPropertyEnum.driver_win) {
    return element.driver_win.name
  } else if (property === CombinedRaceCircuitPropertyEnum.constructor_win) {
    return element.constructor_win.name
  } else {
    return element[property]
  }
}

export function getPropertyCount(inputData: combinedRaceCircuit[], property: CombinedRaceCircuitPropertyEnum): resultType {
  const result: resultType = {}
  inputData.forEach((element) => {
    const p = getProperty(element, property)
    if (Number.isInteger(result[p])) {
      result[p] += 1
    } else {
      result[p] = 1
    }
  })
  return result
}

export function getPropertyArray(inputData: combinedRaceCircuit[], property: CombinedRaceCircuitPropertyEnum): resultArrayType[] {
  const countedData = getPropertyCount(inputData, property)
  const resultArray: resultArrayType[] = []
  Object.entries(countedData).forEach(([key, value]) => {
    resultArray.push({ name: key, value })
  })
  return resultArray
}
