import {
  appUi,
  fallbackPcbShapeData,
  IFootprintDisplayMode,
  IPcbShapeData,
} from '~/base';
import {
  fileDialogHelpers_loadLocalTextFileWithDialog,
  objects,
} from '~/funcs';
import {
  footprintSeeker_findDefaultFootprintSearchWord,
  kicadFileContentLoader,
} from '~/loaders';
import { jsonExporter_openPcbShapeDataJsonInNewTab } from './jsonExporter';
import { svgExporter_openDomSvgImageInNewTab } from './svgExporter';
import { kicadPcbTestData_sp2104 } from './testData';

function createAppStore() {
  const state = {
    pcbShapeData: objects.deepCopy(fallbackPcbShapeData),
    footprintSearchWord: '',
    footprintDisplayMode: 'rect14x14' as IFootprintDisplayMode,
    infoPanelVisible: false,
    dataLoaded: false,
  };

  const internalActions = {
    loadPcbFileContent(text: string) {
      let pcbShapeData: IPcbShapeData;
      try {
        pcbShapeData = kicadFileContentLoader.loadKicadPcbFileContent(text);
      } catch (error: any) {
        console.error(error);
        alert(`an error occurred while loading file`);
        return;
      }
      console.log({ pcbShapeData });
      state.pcbShapeData = pcbShapeData;
      state.footprintSearchWord =
        footprintSeeker_findDefaultFootprintSearchWord(pcbShapeData);
      state.dataLoaded =
        pcbShapeData.outlines.length > 0 || pcbShapeData.footprints.length > 0;
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
    exportSvg() {
      const domSvgOuter = document.getElementById('domSvgPcbShapeViewOuter')!;
      const svgElement = domSvgOuter.firstChild! as SVGSVGElement;
      svgExporter_openDomSvgImageInNewTab(svgElement);
    },
    exportJson() {
      const {
        pcbShapeData: { boundingBox, outlines },
      } = state;
      const { filteredFootprints: footprints } = readers;
      const documentObject = {
        outlines,
        boundingBox,
        footprints,
      };
      jsonExporter_openPcbShapeDataJsonInNewTab(documentObject);
    },
    showInfoPanel() {
      state.infoPanelVisible = true;
    },
    hideInfoPanel() {
      state.infoPanelVisible = false;
    },
  };

  return { state, readers, actions };
}

export const appStore = createAppStore();
