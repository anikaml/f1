import { render, screen } from '@testing-library/react';
import DatePickers from './components/DatePickers'
import { parseISO } from 'date-fns';

describe('Start Date and End Date pickers', () => {
  test('Checks if there is "Start Date" and "End Date" text', () => {
    render(
      <DatePickers startDate={parseISO("03/01/2010")} endDate={new Date()}/>
    );
    const checkStartDate = screen.getByLabelText("Start Date")
    const checkEndDate = screen.getByLabelText("End Date")
    expect(checkStartDate).toBeInTheDocument();
    expect(checkEndDate).toBeInTheDocument();
  });
});