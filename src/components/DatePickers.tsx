import React from 'react'
import { styled } from '@mui/material/styles'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useMediaQuery } from '@mui/material'
import { type RaceDate } from '../libs/interfaces'
import theme from '../utils/theme'
import { MIN_START_DATE } from '../utils/consts'

const PREFIX = 'DatePickers'

const classes = {
  datePickerWeb: `${PREFIX}-datePickerWeb`,
  datePickerMobile: `${PREFIX}-datePickerMobile`
}

const StyledDatePickers = styled('div')({
  [`& .${classes.datePickerWeb}`]: {
    margin: '2em 2em 4em',
    '& .MuiInputBase-input': {
      '& .MuiInput-input': {
        fontFamily: 'Russo One'
      },
      fontFamily: 'Russo One'
    },
    '@media only screen and (min-width: 300px) and (max-width:900px)': {
      margin: '0em 1em 3em 1em'
    }
  },
  [`& .${classes.datePickerMobile}`]: {
    margin: '0em 2em 2em'
  }
})

interface DatePickersPropsType {
  startDate: RaceDate
  endDate: RaceDate
  setStartDateChange: (newStartDate: RaceDate) => void
  setEndDateChange: (newStartDate: RaceDate) => void
}

export default function DatePickers(props: DatePickersPropsType): React.JSX.Element {
  const breakpointSM = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <StyledDatePickers>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          format="MM/dd/yyyy"
          disableFuture
          minDate={new Date(MIN_START_DATE)}
          label="Start Date"
          value={props.startDate}
          onChange={(newStartDate: RaceDate) => { props.setStartDateChange(newStartDate) }}
          className={breakpointSM ? classes.datePickerWeb : classes.datePickerMobile}
        />
        <DatePicker
          format="MM/dd/yyyy"
          disableFuture
          minDate={props.startDate ?? new Date(MIN_START_DATE)}
          label="End Date"
          value={props.endDate}
          onChange={(newEndDate: RaceDate) => { props.setEndDateChange(newEndDate) }}
          className={breakpointSM ? classes.datePickerWeb : classes.datePickerMobile}
        />
      </LocalizationProvider>
    </StyledDatePickers>
  )
}
