import { fireEvent, render, screen } from '@testing-library/react';

import Pagination from '@/components/LiveSearch/pagination';
import userEvent from '@testing-library/user-event';

describe('Pagination.test', () => {
  test('first', () => {
    render(
      <Pagination
        click={(method?: 'i' | 'd', point?: number) => () => {}}
        currentPage={1}
        totalPage={10}
      />
    );
    const container = screen.getByTestId('pagination-test-id');
    expect(container).toBeInTheDocument();
  });
  test('click button next', () => {
    const clickMock = jest.fn();
    render(<Pagination click={clickMock} currentPage={1} totalPage={5} />);

    fireEvent.click(screen.getByText('Next'));
    expect(clickMock).toHaveBeenCalledWith('i');
  });
  test('click button Previous', () => {
    const clickMock = jest.fn();
    render(<Pagination click={clickMock} currentPage={1} totalPage={5} />);

    fireEvent.click(screen.getByText('Previous'));
    expect(clickMock).toHaveBeenCalledWith('d');
  });
});
