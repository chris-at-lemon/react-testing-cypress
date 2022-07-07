import { render, screen } from "@testing-library/react"
import TransactionCreateStepTwo from "./TransactionCreateStepTwo"

test('check button disabled on initial render', () => {
  render(<TransactionCreateStepTwo sender={{id: '5'}} receiver={{id: '5'}} />)

  expect(screen.getByRole('button',  {name: /pay/i})).toBeEnabled();
}) 