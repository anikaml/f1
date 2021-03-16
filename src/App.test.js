import { render, screen } from '@testing-library/react';
import DatePickers from './components/DatePickers'

describe('Start Date and End Date pickers', () => {
  test('Checks if there is "Start Date" and "End Date" text', () => {
    render(
      <DatePickers startDate={"03/01/2010"} endDate={new Date()}/>
    );
    const checkStartDate = screen.getByText("Start Date")
    const checkEndDate = screen.getByText("End Date")
    expect(checkStartDate).toBeInTheDocument();
    expect(checkEndDate).toBeInTheDocument();
    // screen.debug();
  });
});