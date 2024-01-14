import { render, screen } from '@testing-library/react';

import InputCustom from '../../components/LiveSearch/input';
import userEvent from '@testing-library/user-event';

describe('Input.test', () => {
  it('renders without errors', () => {
    const { getByPlaceholderText } = render(<InputCustom />);
    const inputElement = screen.getByPlaceholderText('Search');

    expect(inputElement).toBeInTheDocument();
  });

  it('calls handleChange on input change', async () => {
    const mockHandleChange = jest.fn();
    render(<InputCustom handleChange={mockHandleChange} />);
    const inputElement = screen.getByPlaceholderText('Search');
    await userEvent.type(inputElement, 'New Value');
    expect(inputElement).toHaveValue('New Value');
    await userEvent.clear(inputElement);
    expect(inputElement).toHaveValue('');
  });
});
