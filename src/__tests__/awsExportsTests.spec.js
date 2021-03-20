import {getGraphQLEndpoint, isProduction, devGraphQLURL, prodGraphQLURL, devURL, prodURL} from '../aws-exports';

describe('getGraphQLEndpoint function', () => {
  test('It should return production GraphQL URL', () => {
    expect(getGraphQLEndpoint(true)).toEqual(prodGraphQLURL);
  })

  test('It should return dev GraphQL URL', () => {
    expect(getGraphQLEndpoint(false)).toEqual(devGraphQLURL);
  })
})

describe('isProduction function', () => {
  test(`It should return true if hostname equals ${prodURL}`, () => {
    expect(isProduction(prodURL)).toEqual(true);
  })

  test(`It should return false if hostname equals ${devURL}`, () => {
    expect(isProduction(devURL)).toEqual(false);
  })

  test(`It should return false if hostname is empty string`, () => {
    expect(isProduction('')).toEqual(false);
  })

  test(`It should return false if hostname is localhost`, () => {
    expect(isProduction('localhost')).toEqual(false);
  })
})