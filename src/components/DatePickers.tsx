import { styled } from '@mui/material/styles';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useMediaQuery } from "@mui/material";
import { RaceDate } from '../libs/interfaces';
import theme from "../utils/theme";

const PREFIX = 'DatePickers';

const classes = {
  datePickerWeb: `${PREFIX}-datePickerWeb`,
  datePickerMobile: `${PREFIX}-datePickerMobile`
};

const StyledDatePickers = styled('div')({
  [`& .${classes.datePickerWeb}`]: {
    margin: '2em 2em 4em',
    '& .MuiInputBase-input': {
      '& .MuiInput-input': {
        fontFamily: "Russo One",
      },
      fontFamily: "Russo One",
    },
  },
  [`& .${classes.datePickerMobile}`]: {
    margin: '0em 2em 2em',
  }
});

interface DatePickersPropsType {
  startDate: RaceDate,
  endDate: RaceDate,
  setStartDateChange: (newStartDate: RaceDate) => void,
  setEndDateChange: (newStartDate: RaceDate) => void
}

export default function DatePickers(props:DatePickersPropsType): JSX.Element {

  const breakpointSM = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <StyledDatePickers>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          format="MM/dd/yyyy"
          disableFuture
          minDate={new Date("1950-05-02")}
          label="Start Date"
          value={props.startDate}
          onChange={(newStartDate: RaceDate) => props.setStartDateChange(newStartDate)}
          className={breakpointSM ? classes.datePickerWeb : classes.datePickerMobile}
        />
        <DatePicker
          format="MM/dd/yyyy"
          disableFuture
          minDate={props.startDate || new Date("1950-05-02")}
          label="End Date"
          value={props.endDate}
          onChange={(newEndDate: RaceDate) => props.setEndDateChange(newEndDate)}
          className={breakpointSM ? classes.datePickerWeb : classes.datePickerMobile}
        />
      </LocalizationProvider>
    </StyledDatePickers>
  );
}
