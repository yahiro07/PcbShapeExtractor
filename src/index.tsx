import { jsx, render } from 'alumina';
import { appStore } from './store';
import { PageRoot } from './ui';

async function start() {
  console.log('kicad pcb shape extractor v220910');
  appStore.actions.loadTestData();
  render(() => <PageRoot />, document.getElementById('app'));
}

start();
