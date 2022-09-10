import { appUi, fallbackPcbShapeData } from '~/base';
import {
  fileDialogHelpers_loadLocalTextFileWithDialog,
  objects,
} from '~/funcs';
import { kicadFileContentLoader } from '~/loaders';
import { kicadPcbTestData_sp2104 } from './testData';

function createAppStore() {
  const state = {
    pcbShapeData: objects.deepCopy(fallbackPcbShapeData),
  };

  const internalActions = {
    loadPcbFileContent(text: string) {
      const pcbShapeData = kicadFileContentLoader.loadKicadPcbFileContent(text);
      console.log({ pcbShapeData });
      state.pcbShapeData = pcbShapeData;
      appUi.rerender();
    },
  };

  const actions = {
    async loadKicadPcbFile() {
      const res = await fileDialogHelpers_loadLocalTextFileWithDialog(
        '.kicad_pcb'
      );
      if (res) {
        internalActions.loadPcbFileContent(res.contentText);
      }
    },
    loadTestData() {
      internalActions.loadPcbFileContent(kicadPcbTestData_sp2104);
    },
  };

  return { state, actions };
}

export const appStore = createAppStore();
