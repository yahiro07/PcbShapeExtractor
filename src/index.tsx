import { css, domStyled, FC, jsx, render } from 'alumina';
import { kicadFileContentLoader } from './loaders';
import { PcbShapeView } from './ui';

async function fetchAssetTextFile(filePath: string) {
  const res = await fetch(filePath);
  const text = await res.text();
  return text;
}

async function start() {
  const targetFilePath = './keydrip7_2208d.kicad_pcb';
  console.log('----------');

  const kicadFileContent = await fetchAssetTextFile(targetFilePath);
  const pcbShapeData =
    kicadFileContentLoader.loadKicadPcbFileContent(kicadFileContent);
  console.log({ pcbShapeData });

  const PageRoot: FC = () => {
    return domStyled(
      <div>
        <PcbShapeView pcbShapeData={pcbShapeData} />
      </div>,
      css``
    );
  };

  render(() => <PageRoot />, document.getElementById('app'));
}

start();
