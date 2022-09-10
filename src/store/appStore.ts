import { appUi, fallbackPcbShapeData, IFootprintDisplayMode } from '~/base';
import {
  fileDialogHelpers_loadLocalTextFileWithDialog,
  objects,
} from '~/funcs';
import {
  footprintSeeker_findDefaultFootprintSearchWord,
  kicadFileContentLoader,
} from '~/loaders';
import { kicadPcbTestData_sp2104 } from './testData';

function createAppStore() {
  const state = {
    pcbShapeData: objects.deepCopy(fallbackPcbShapeData),
    footprintSearchWord: '',
    footprintDisplayMode: 'plus' as IFootprintDisplayMode,
  };

  const internalActions = {
    loadPcbFileContent(text: string) {
      const pcbShapeData = kicadFileContentLoader.loadKicadPcbFileContent(text);
      console.log({ pcbShapeData });
      state.pcbShapeData = pcbShapeData;
      state.footprintSearchWord =
        footprintSeeker_findDefaultFootprintSearchWord(pcbShapeData);
      appUi.rerender();
    },
  };

  const readers = {
    get filteredFootprints() {
      const { pcbShapeData, footprintSearchWord } = state;
      return pcbShapeData.footprints.filter((it) =>
        it.footprintName.toLowerCase().includes(footprintSearchWord)
      );
    },
    get numFootprintsMatched() {
      return readers.filteredFootprints.length;
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
    setFootprintSearchWord(word: string) {
      state.footprintSearchWord = word;
    },
    setFootprintDisplayMode(mode: IFootprintDisplayMode) {
      state.footprintDisplayMode = mode;
    },
  };

  return { state, readers, actions };
}

export const appStore = createAppStore();
