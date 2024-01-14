import { render, screen } from '@testing-library/react';

import { LiveSearchWithUseDeferredValue } from '@/components/LiveSearch/live-search-with-use-deferred-value';

describe('first test', () => {
  test('test', () => {
    render(<LiveSearchWithUseDeferredValue />);
    const myElem = screen.getByTestId('mainDiv');
    expect(myElem).toBeInTheDocument();
  });
});
