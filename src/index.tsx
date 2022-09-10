import { jsx, render } from 'alumina';
import { PageRoot } from './ui';

async function start() {
  console.log('kicad pcb shape extractor v220910');
  render(() => <PageRoot />, document.getElementById('app'));
}

start();
