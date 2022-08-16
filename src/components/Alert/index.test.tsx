import React from 'react';

import { render } from '@testing-library/react';

import Alert from './index';

describe('Alert component', () => {
  it('Should render correctely error type', () => {
    const nodeEl = render(<Alert type="error" title="Error title" text="Error text!" />);

    expect(nodeEl.baseElement).toHaveTextContent('Error title');
    expect(nodeEl.baseElement).toHaveTextContent('Error text!');
  });

  it('Should render correctely success type', () => {
    const nodeEl = render(<Alert type="success" title="Success title" text="Success text!" />);

    expect(nodeEl.baseElement).toHaveTextContent('Success title');
    expect(nodeEl.baseElement).toHaveTextContent('Success text!');
  });

  it('Should render correctely info type', () => {
    const nodeEl = render(<Alert type="info" title="Info title" text="Info text!" />);

    expect(nodeEl.baseElement).toHaveTextContent('Info title');
    expect(nodeEl.baseElement).toHaveTextContent('Info text!');
  });

  it('Should render correctely null type', () => {
    const nodeEl = render(<Alert type="" title="Null title" text="Null text!" />);

    expect(nodeEl.baseElement).toHaveTextContent('Null title');
    expect(nodeEl.baseElement).toHaveTextContent('Null text!');
  });
});