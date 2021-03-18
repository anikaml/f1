import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider, makeStyles } from "@material-ui/styles";

import {RaceDate} from '../libs/interfaces';

const datePickerTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#e10600"
    },
  },
});

const useStyles = makeStyles({
  datePicker: {
    margin: '2em',
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
          className={classes.datePicker}
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
          className={classes.datePicker}
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  )
}