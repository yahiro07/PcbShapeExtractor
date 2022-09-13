import { applyGlobalStyle, jsx, render } from 'alumina';
import { appConfig } from './base';
import { PageRoot } from './ui';
import { cssGlobalStyle } from './ui/globalStyle';

async function start() {
  console.log(`PCB Shape Extractor ${appConfig.versionCode}`);
  applyGlobalStyle(cssGlobalStyle);
  render(() => <PageRoot />, document.getElementById('app'));
}

start();
