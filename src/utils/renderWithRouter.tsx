import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';

interface RenderWithRouterProps {
  route?: string;
  history?: MemoryHistory;
}

export const renderWithRouter = (
  children: React.ReactNode,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  }: RenderWithRouterProps = {}
) => {
  return {
    ...render(<Router history={history}>{children}</Router>),
    history
  };
};
