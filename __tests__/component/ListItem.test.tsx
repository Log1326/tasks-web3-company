import { render, screen } from '@testing-library/react';

import ListItem from '@/components/LiveSearch/list-item';

describe('ListItem.test', () => {
  const data: any = { name: 'London' };

  test('first', () => {
    render(<ListItem data={data} />);
    const container = screen.getByTestId('list-item-test-id');
    expect(container).toBeInTheDocument();
  });
  test('have name', () => {
    render(<ListItem data={data} />);
    const container = screen.getByText('London');
    expect(container).toBeInTheDocument();
  });
});
