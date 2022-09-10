import { appUi, fallbackPcbShapeData } from '~/base';
import {
  fileDialogHelpers_loadLocalTextFileWithDialog,
  objects,
} from '~/funcs';
import { kicadFileContentLoader } from '~/loaders';

function createAppStore() {
  const state = {
    pcbShapeData: objects.deepCopy(fallbackPcbShapeData),
  };

  const actions = {
    async loadKicadPcbFile() {
      const res = await fileDialogHelpers_loadLocalTextFileWithDialog(
        '.kicad_pcb'
      );
      if (res) {
        const pcbShapeData = kicadFileContentLoader.loadKicadPcbFileContent(
          res.contentText
        );
        console.log({ pcbShapeData });
        state.pcbShapeData = pcbShapeData;
        appUi.rerender();
      }
    },
  };

  return { state, actions };
}

export const appStore = createAppStore();
