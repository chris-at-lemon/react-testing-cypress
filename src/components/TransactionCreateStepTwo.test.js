import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import TransactionCreateStepTwo from "./TransactionCreateStepTwo"

test('if  amount and note is entered pay button becomes enabled', async () => {
  render(<TransactionCreateStepTwo sender={{id: '5'}} receiver={{id: '5'}} />);

  expect(await screen.findByRole('button',  {name: 'Pay'})).toBeDisabled();

  userEvent.type(screen.getByPlaceholderText(/amount/i), '50');
  userEvent.type(screen.getByPlaceholderText(/add a note/i), 'dinner');

  expect(await screen.findByRole('button',  {name: 'Pay'})).toBeEnabled();
}) 

