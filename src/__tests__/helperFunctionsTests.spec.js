import { getProperty, getPropertyCount, getPropertyArray } from '../utils/helpers';
import {combinedRaceData} from '../fixtures/combinedRaceData';

describe('getProperty function', () => {
  const singleRaceData = combinedRaceData[0]
  test('It should return circuit name', () => {
    const output = "Bahrain International Circuit"

    expect(getProperty(singleRaceData, "circuitName")).toEqual(output);
  })
  test('It should return driver name', () => {
    const output = "Fernando Alonso"

    expect(getProperty(singleRaceData, "driver_win")).toEqual(output);
  })
  test('It should return constructor name', () => {
    const output = "Ferrari"

    expect(getProperty(singleRaceData, "constructor_win")).toEqual(output);
  })
})

describe('getPropertyCount function', () => {
  test('It should return object with key of circuitName as string and value as number of how many times it appears using full data', () => {
    const output = {
      "Albert Park Grand Prix Circuit": 10,
      "Autodromo Enzo e Dino Ferrari": 1,
      "Autodromo Internazionale del Mugello": 1,
      "Autodromo Nazionale di Monza": 11,
      "Autódromo Hermanos Rodríguez": 5,
      "Autódromo Internacional do Algarve": 1,
      "Autódromo José Carlos Pace": 10,
      "Bahrain International Circuit": 11,
      "Baku City Circuit": 4,
      "Buddh International Circuit": 3,
      "Circuit Gilles Villeneuve": 10,
      "Circuit Paul Ricard": 2,
      "Circuit de Barcelona-Catalunya": 11,
      "Circuit de Monaco": 10,
      "Circuit de Spa-Francorchamps": 11,
      "Circuit of the Americas": 8,
      "Hockenheimring": 6,
      "Hungaroring": 11,
      "Istanbul Park": 3,
      "Korean International Circuit": 4,
      "Marina Bay Street Circuit": 10,
      "Nürburgring": 3,
      "Red Bull Ring": 8,
      "Sepang International Circuit": 8,
      "Shanghai International Circuit": 10,
      "Silverstone Circuit": 12,
      "Sochi Autodrom": 7,
      "Suzuka Circuit": 10,
      "Valencia Street Circuit": 3,
      "Yas Marina Circuit": 11,
    }
    expect(getPropertyCount(combinedRaceData, "circuitName")).toEqual(output);
    })

    test('It should return object with key of circuitName as string and value as number of how many times it appears using partial data', () => {
      const output = {
        "Albert Park Grand Prix Circuit": 3,
        "Autodromo Nazionale di Monza": 2,
        "Autódromo José Carlos Pace": 2,
        "Bahrain International Circuit": 1,
        "Buddh International Circuit": 1,
        "Circuit Gilles Villeneuve": 2,
        "Circuit de Barcelona-Catalunya": 2,
        "Circuit de Monaco": 2,
        "Circuit de Spa-Francorchamps": 2,
        "Hockenheimring": 1,
        "Hungaroring": 2,
        "Istanbul Park": 2,
        "Korean International Circuit": 2,
        "Marina Bay Street Circuit": 2,
        "Nürburgring": 1,
        "Sepang International Circuit": 3,
        "Shanghai International Circuit": 2,
        "Silverstone Circuit": 2,
        "Suzuka Circuit": 2,
        "Valencia Street Circuit": 2,
        "Yas Marina Circuit": 2,
      }
      expect(getPropertyCount(combinedRaceData.slice(0, 40), "circuitName")).toEqual(output);
    })

    test('It should return one result using one data point and "circuitName" property', () => { 
      expect(getPropertyCount(combinedRaceData.slice(0, 1), "circuitName")).toEqual({"Bahrain International Circuit": 1,});
    })

    test('It should return empty object using no data and "circuitName" property', () => { 
      expect(getPropertyCount([], "circuitName")).toEqual({});
    })

    test('It should return object with key of driver_win as string and value as number of how many times he wins using full data', () => { 
      const output = {
        "Charles Leclerc": 2,
        "Daniel Ricciardo": 7,
        "Fernando Alonso": 11,
        "Jenson Button": 8,
        "Kimi Räikkönen": 3,
        "Lewis Hamilton": 84,
        "Mark Webber": 7,
        "Max Verstappen": 10,
        "Nico Rosberg": 23,
        "Pastor Maldonado": 1,
        "Pierre Gasly": 1,
        "Sebastian Vettel": 48,
        "Sergio Pérez": 1,
        "Valtteri Bottas": 9,
      }
      expect(getPropertyCount(combinedRaceData, "driver_win")).toEqual(output);
    })

    test('It should return object with key of driver_win as string and value as number of how many times he wins using partial data', () => { 
      const output = {
        "Fernando Alonso": 1,
        "Jenson Button": 1,
        "Sebastian Vettel": 1,
      }
      expect(getPropertyCount(combinedRaceData.slice(0, 3), "driver_win")).toEqual(output);
    })

    test('It should return one result using one data point and "driver_win" property', () => { 
      expect(getPropertyCount(combinedRaceData.slice(0, 1), "driver_win")).toEqual({"Fernando Alonso": 1,});
    })

    test('It should return empty object using no data and "driver_win" property', () => { 
      expect(getPropertyCount([], "driver_win")).toEqual({});
    })

    test('It should return object with key of constructor_win as string and value as number of how many times they won using full data', () => {
      const output = {
        "AlphaTauri": 1,
        "Ferrari": 28,
        "Lotus F1": 2,
        "McLaren": 18,
        "Mercedes": 106,
        "Racing Point": 1,
        "Red Bull": 58,
        "Williams": 1,
      }
      expect(getPropertyCount(combinedRaceData, "constructor_win")).toEqual(output);
    })

    test('It should return object with key of constructor_win as string and value as number of how many times they won using partial data', () => {
      const output = {
        "Ferrari": 1,
        "McLaren": 2,
        "Red Bull": 2
      }
      expect(getPropertyCount(combinedRaceData.slice(0, 5), "constructor_win")).toEqual(output);
    })

    test('It should return one result using one data point and "constructor_win" property', () => { 
      expect(getPropertyCount(combinedRaceData.slice(0, 1), "constructor_win")).toEqual({"Ferrari": 1});
    })

    test('It should return empty object using no data and "constructor_win" property', () => { 
      expect(getPropertyCount([], "constructor_win")).toEqual({});
    })
})

describe('getPropertyArray function', () => {
  test('It should convert object to consist of name value pairs using no data', () => { 
    expect(getPropertyArray([], "constructor_win")).toEqual([]);
  })

  test('It should convert object to consist of name value pairs using one data point', () => { 
    expect(getPropertyArray(combinedRaceData.slice(0, 1), "constructor_win")).toEqual([{"name": "Ferrari", "value": 1}]);
  })

  test('It should convert object to consist of name value pairs using full data', () => { 
    const output = [
      {
        "name": "Ferrari",
        "value": 28
      },
      {
          "name": "McLaren",
          "value": 18,
      },
      {
          "name": "Red Bull",
          "value": 58,
      },
      {
          "name": "Mercedes",
          "value": 106,
      },
      {
          "name": "Williams",
          "value": 1,
      },
      {
          "name": "Lotus F1",
          "value": 2,
      },
      {
          "name": "AlphaTauri",
          "value": 1,
      },
      {
          "name": "Racing Point",
          "value": 1,
      }
    ]
    expect(getPropertyArray(combinedRaceData, "constructor_win")).toEqual(output);
  })

})