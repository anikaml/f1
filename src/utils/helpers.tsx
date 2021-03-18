import { combinedRaceCircuit } from '../libs/interfaces';

interface resultType {
  [name: string]: number
}

interface resultArrayType {
  name: string,
  value: number
}

export function getPropertyCount(inputData: combinedRaceCircuit[]) {
  let result: resultType = {}
  inputData.forEach((element) => {
    if(result[element.circuitName]){
      result[element.circuitName] += 1
    } else {
      result[element.circuitName] = 1
    }
  })
  return result
}

export function getPropertyArray(inputData: combinedRaceCircuit[]) {
  let countedData = getPropertyCount(inputData)
  let resultArray: resultArrayType[] = []
  Object.entries(countedData).forEach(([key, value]) => {
    resultArray.push({name: key, value: value})
  })
  return resultArray
}