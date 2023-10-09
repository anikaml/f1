import '@testing-library/jest-dom'
import { getProperty, getPropertyCount, getPropertyArray, isValidRaceDate } from '../helpers'
import { DEFAULT_START_DATE, MIN_START_DATE } from '../../utils/consts'

import combinedRaceData from '../../__tests__/fixtures/combinedRaceData.json'

describe('getProperty function', () => {
  const singleRaceData = combinedRaceData[0]
  test('It should return circuit name', () => {
    const output = 'Bahrain International Circuit'

    expect(getProperty(singleRaceData, 'circuitName')).toEqual(output)
  })
  test('It should return driver name', () => {
    const output = 'Fernando Alonso'

    expect(getProperty(singleRaceData, 'driver_win')).toEqual(output)
  })
  test('It should return constructor name', () => {
    const output = 'Ferrari'

    expect(getProperty(singleRaceData, 'constructor_win')).toEqual(output)
  })
})

describe('getPropertyCount function', () => {
  test('It should return object with key of circuitName as string and value as number of how many times it appears using full data', () => {
    const output = {
      'Albert Park Grand Prix Circuit': 1,
      'Autodromo Nazionale di Monza': 1,
      'Autódromo José Carlos Pace': 1,
      'Bahrain International Circuit': 1,
      'Circuit Gilles Villeneuve': 1,
      'Circuit de Barcelona-Catalunya': 1,
      'Circuit de Monaco': 1,
      'Circuit de Spa-Francorchamps': 1,
      Hockenheimring: 1,
      Hungaroring: 1,
      'Istanbul Park': 1,
      'Korean International Circuit': 1,
      'Marina Bay Street Circuit': 1,
      'Sepang International Circuit': 1,
      'Shanghai International Circuit': 1,
      'Silverstone Circuit': 1,
      'Suzuka Circuit': 1,
      'Valencia Street Circuit': 1,
      'Yas Marina Circuit': 1
    }
    expect(getPropertyCount(combinedRaceData, 'circuitName')).toEqual(output)
  })

  test('It should return object with key of circuitName as string and value as number of how many times it appears using partial data', () => {
    const output = {
      'Albert Park Grand Prix Circuit': 1,
      'Autodromo Nazionale di Monza': 1,
      'Autódromo José Carlos Pace': 1,
      'Bahrain International Circuit': 1,
      'Circuit Gilles Villeneuve': 1,
      'Circuit de Barcelona-Catalunya': 1,
      'Circuit de Monaco': 1,
      'Circuit de Spa-Francorchamps': 1,
      Hockenheimring: 1,
      Hungaroring: 1,
      'Istanbul Park': 1,
      'Korean International Circuit': 1,
      'Marina Bay Street Circuit': 1,
      'Sepang International Circuit': 1,
      'Shanghai International Circuit': 1,
      'Silverstone Circuit': 1,
      'Suzuka Circuit': 1,
      'Valencia Street Circuit': 1,
      'Yas Marina Circuit': 1
    }
    expect(getPropertyCount(combinedRaceData.slice(0, 40), 'circuitName')).toEqual(output)
  })

  test('It should return one result using one data point and "circuitName" property', () => {
    expect(getPropertyCount(combinedRaceData.slice(0, 1), 'circuitName')).toEqual({ 'Bahrain International Circuit': 1 })
  })

  test('It should return empty object using no data and "circuitName" property', () => {
    expect(getPropertyCount([], 'circuitName')).toEqual({})
  })

  test('It should return object with key of driver_win as string and value as number of how many times he wins using full data', () => {
    const output = {
      'Fernando Alonso': 5,
      'Jenson Button': 2,
      'Lewis Hamilton': 3,
      'Mark Webber': 4,
      'Sebastian Vettel': 5
    }
    expect(getPropertyCount(combinedRaceData, 'driver_win')).toEqual(output)
  })

  test('It should return object with key of driver_win as string and value as number of how many times he wins using partial data', () => {
    const output = {
      'Fernando Alonso': 1,
      'Jenson Button': 1,
      'Sebastian Vettel': 1
    }
    expect(getPropertyCount(combinedRaceData.slice(0, 3), 'driver_win')).toEqual(output)
  })

  test('It should return one result using one data point and "driver_win" property', () => {
    expect(getPropertyCount(combinedRaceData.slice(0, 1), 'driver_win')).toEqual({ 'Fernando Alonso': 1 })
  })

  test('It should return empty object using no data and "driver_win" property', () => {
    expect(getPropertyCount([], 'driver_win')).toEqual({})
  })

  test('It should return object with key of constructor_win as string and value as number of how many times they won using full data', () => {
    const output = {
      Ferrari: 5,
      McLaren: 5,
      'Red Bull': 9
    }
    expect(getPropertyCount(combinedRaceData, 'constructor_win')).toEqual(output)
  })

  test('It should return object with key of constructor_win as string and value as number of how many times they won using partial data', () => {
    const output = {
      Ferrari: 1,
      McLaren: 2,
      'Red Bull': 2
    }
    expect(getPropertyCount(combinedRaceData.slice(0, 5), 'constructor_win')).toEqual(output)
  })

  test('It should return one result using one data point and "constructor_win" property', () => {
    expect(getPropertyCount(combinedRaceData.slice(0, 1), 'constructor_win')).toEqual({ Ferrari: 1 })
  })

  test('It should return empty object using no data and "constructor_win" property', () => {
    expect(getPropertyCount([], 'constructor_win')).toEqual({})
  })
})

describe('getPropertyArray function', () => {
  test('It should convert object to consist of name value pairs using no data', () => {
    expect(getPropertyArray([], 'constructor_win')).toEqual([])
  })

  test('It should convert object to consist of name value pairs using one data point', () => {
    expect(getPropertyArray(combinedRaceData.slice(0, 1), 'constructor_win')).toEqual([{ name: 'Ferrari', value: 1 }])
  })

  test('It should convert object to consist of name value pairs using full data', () => {
    const output = [
      {
        name: 'Ferrari',
        value: 5
      },
      {
        name: 'McLaren',
        value: 5
      },
      {
        name: 'Red Bull',
        value: 9
      }
    ]
    expect(getPropertyArray(combinedRaceData, 'constructor_win')).toEqual(output)
  })
})

describe('isValidRaceDate function', () => {
  test('It should be true for current date', () => {
    expect(isValidRaceDate(new Date(), new Date(MIN_START_DATE))).toBeTruthy()
  })
  test('It should be true for minimum date', () => {
    expect(isValidRaceDate(new Date(MIN_START_DATE), new Date(MIN_START_DATE))).toBeTruthy()
  })
  test('It should be true for default start date', () => {
    expect(isValidRaceDate(new Date(DEFAULT_START_DATE), new Date(MIN_START_DATE))).toBeTruthy()
  })
  test('It should be false for null date', () => {
    expect(isValidRaceDate(null, new Date(MIN_START_DATE))).toBeFalsy()
  })
  test('It should be false for date below minimum', () => {
    expect(isValidRaceDate(new Date('1800-10-10'), new Date(MIN_START_DATE))).toBeFalsy()
  })
  test('It should be false for future date', () => {
    expect(isValidRaceDate(new Date('9000-10-10'), new Date(MIN_START_DATE))).toBeFalsy()
  })
})
