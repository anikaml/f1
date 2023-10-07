import { useContext, createContext } from 'react'
import { type circuitObject, type RaceDate } from '../libs/interfaces'

interface ContextProps {
  allCircuits: Promise<circuitObject>
};

export const AppContext = createContext<Partial<ContextProps>>({})

export function useAppContext(): Partial<ContextProps> {
  return useContext(AppContext)
}

interface DateContextProps {
  startDate: RaceDate
  endDate: RaceDate
};

export const DateContext = createContext<Partial<DateContextProps>>({})

export function useDateContext(): Partial<DateContextProps> {
  return useContext(DateContext)
}
