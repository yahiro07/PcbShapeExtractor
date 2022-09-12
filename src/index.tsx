import { applyGlobalStyle, jsx, render } from 'alumina';
import { appStore } from './store';
import { PageRoot } from './ui';
import { cssGlobalStyle } from './ui/globalStyle';

async function start() {
  console.log('PCB Shape Extractor v220912');
  appStore.actions.loadTestData();
  applyGlobalStyle(cssGlobalStyle);
  render(() => <PageRoot />, document.getElementById('app'));
}

start();
