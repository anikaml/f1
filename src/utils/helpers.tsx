import { combinedRaceCircuit, CombinedRaceCircuitPropertyEnum } from '../libs/interfaces';

interface resultType {
  [name: string]: number
}

interface resultArrayType {
  name: string,
  value: number
}

export function getProperty(element: combinedRaceCircuit, property: CombinedRaceCircuitPropertyEnum) {
  if (property === CombinedRaceCircuitPropertyEnum.driver_win) {
    return element.driver_win.name
  } else if (property === CombinedRaceCircuitPropertyEnum.constructor_win) {
    return element.constructor_win.name
  } else {
    return element[property]
  }
}

export function getPropertyCount(inputData: combinedRaceCircuit[], property: CombinedRaceCircuitPropertyEnum) {
  let result: resultType = {}
  inputData.forEach((element) => {
    let p = getProperty(element, property)
    if (result[p]) {
      result[p] += 1
    } else {
      result[p] = 1
    }
  })
  return result
}

export function getPropertyArray(inputData: combinedRaceCircuit[], property: CombinedRaceCircuitPropertyEnum) {
  let countedData = getPropertyCount(inputData, property)
  let resultArray: resultArrayType[] = []
  Object.entries(countedData).forEach(([key, value]) => {
    resultArray.push({ name: key, value: value })
  })
  return resultArray
}