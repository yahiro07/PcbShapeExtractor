import { css } from 'alumina';

export const uiTheme = {
  unitHeight: 30,
};

export const colors = {
  panelEdge: '#aaa',
};

export const commonTransitionSec = `0.1s`;

export const cssCommonTransitionSpec = css`
  transition: all ${commonTransitionSec} linear;
`;
