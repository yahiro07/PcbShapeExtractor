import { applyGlobalStyle, jsx, render } from 'alumina';
import { appStore } from './store';
import { PageRoot } from './ui';
import { cssGlobalStyle } from './ui/globalStyle';

async function start() {
  console.log('kicad pcb shape extractor v220910');
  appStore.actions.loadTestData();
  applyGlobalStyle(cssGlobalStyle);
  render(() => <PageRoot />, document.getElementById('app'));
}

start();
