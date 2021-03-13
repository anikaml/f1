import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {RaceDate, WorldMapPropsType} from './map/WorldMap';

interface DatePickersPropsType extends WorldMapPropsType {
  setStartDateChange: (newStartDate: RaceDate) => void,
  setEndDateChange: (newStartDate: RaceDate) => void
}

export default function DatePickers(props:DatePickersPropsType): JSX.Element {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        autoOk
        format="MM/dd/yyyy"
        disableFuture
        minDate={new Date("1950-05-02")}
        variant="inline"
        label="Start Date"
        value={props.startDate}
        onChange={(newStartDate: RaceDate) => props.setStartDateChange(newStartDate)}
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
      />
    </MuiPickersUtilsProvider>
  )
}