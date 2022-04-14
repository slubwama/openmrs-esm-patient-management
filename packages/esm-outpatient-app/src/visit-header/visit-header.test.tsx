import React from 'react';
import VisitHeader from './visit-header.component';
import { screen, render } from '@testing-library/react';

describe('VisitHeader', () => {
  test('should render visit header', () => {
    render(<VisitHeader />);
  });
});
