import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createMuiTheme, useMediaQuery } from "@material-ui/core";
import { ThemeProvider, makeStyles } from "@material-ui/styles";

import {RaceDate} from '../libs/interfaces';
import theme from "../utils/theme";

const datePickerTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#e10600"
    },
  },
});

const useStyles = makeStyles({
  datePickerWeb: {
    margin: '2em 2em 4em',
    '& .MuiInputBase-input': {
      '& .MuiInput-input': {
        fontFamily: "Russo One",
      },
      fontFamily: "Russo One",
    },
  },
  inputBase: {
    fontFamily: "Russo One",
  },
  datePickerMobile: {
    margin: '0em 2em 2em',
  },
  inputLabel: {
    fontFamily: "Russo One",
  }
});

interface DatePickersPropsType {
  startDate: RaceDate,
  endDate: RaceDate,
  setStartDateChange: (newStartDate: RaceDate) => void,
  setEndDateChange: (newStartDate: RaceDate) => void
}

export default function DatePickers(props:DatePickersPropsType): JSX.Element {
  const classes = useStyles();
  const breakpointSM = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={datePickerTheme}>
        <DatePicker
          autoOk
          format="MM/dd/yyyy"
          disableFuture
          minDate={new Date("1950-05-02")}
          variant="inline"
          label="Start Date"
          value={props.startDate}
          onChange={(newStartDate: RaceDate) => props.setStartDateChange(newStartDate)}
          className={breakpointSM? classes.datePickerWeb : classes.datePickerMobile}
          InputProps={{
            className: classes.inputBase 
          }}
          InputLabelProps={{
            className: classes.inputLabel 
          }}
        />
        <DatePicker
          autoOk
          format="MM/dd/yyyy"
          disableFuture
          minDate={props.startDate}
          variant="inline"
          label="End Date"
          value={props.endDate}
          onChange={(newEndDate: RaceDate) => props.setEndDateChange(newEndDate)}
          className={breakpointSM? classes.datePickerWeb : classes.datePickerMobile}
          InputProps={{
            className: classes.inputBase 
          }}
          InputLabelProps={{
            className: classes.inputLabel 
          }}
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  )
}