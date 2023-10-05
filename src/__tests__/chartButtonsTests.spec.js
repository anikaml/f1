import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import ChartSelector from '../components/charts/ChartSelector';

import combinedRaceData from './fixtures/combinedRaceData.json';


function setup() {
  return render(
    <ChartSelector raceData={combinedRaceData} />
  );
}

describe('Chart Buttons', () => {
  test('checks if first button is disabled when page renders', () => {
    setup()
    screen.getByRole('button', { name: /Circuits/i })
    expect(screen.getByRole('button', { name: /Circuits/i })).toBeDisabled();
  })

  test('checks if second button is disabled when clicked', async () => {
    setup()
    const view = userEvent.setup();
    await view.click(screen.getByRole('button', { name: /Drivers/i }))
    expect(screen.getByRole('button', { name: /Drivers/i })).toBeDisabled()
  })

  test('checks if first button is not disabled when user clicked on second button', async () => {
    setup()
    const view = userEvent.setup();
    await view.click(screen.getByRole('button', { name: /Drivers/i }))
    expect(screen.getByRole('button', { name: /Circuits/i })).not.toBeDisabled();
  })
})
