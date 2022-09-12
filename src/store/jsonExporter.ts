import stringify from 'json-stringify-pretty-compact';
import { appConfig, IPcbShapeData, IPoint } from '~/base';

function roundCoord(value: number): number {
  return Math.round(value * 10000) / 10000;
}

function roundCoordXY(p: IPoint) {
  return {
    x: roundCoord(p.x),
    y: roundCoord(p.y),
  };
}

function formatPcbDataForExport(pcbShapeData: IPcbShapeData): any {
  const bb = pcbShapeData.boundingBox;
  const om = appConfig.shapeBoundingBoxOuterMargin;
  return {
    boundingBox: {
      x: bb.x + om,
      y: bb.y + om,
      w: bb.w - om * 2,
      h: bb.h - om * 2,
    },
    outlines: pcbShapeData.outlines.map((gr) => {
      if (gr.type === 'path') {
        return {
          type: 'path',
          segments: gr.segments.map((seg) => ({
            type: seg.type,
            points: seg.points.map(roundCoordXY),
          })),
        };
      } else if (gr.type === 'grCircle') {
        return {
          type: 'grCircle',
          center: roundCoordXY(gr.center),
          radius: roundCoord(gr.radius),
        };
      } else if (gr.type === 'grPoly') {
        return {
          type: 'grPoly',
          points: gr.points.map(roundCoordXY),
        };
      } else if (gr.type === 'grRect') {
        return {
          type: 'grRect',
          points: gr.points.map(roundCoordXY),
        };
      }
    }),
    footprints: pcbShapeData.footprints.map((it) => ({
      ref: it.referenceName,
      x: roundCoord(it.at.x),
      y: roundCoord(it.at.y),
      angle: roundCoord(it.at.angle ?? 0),
    })),
  };
}

export function jsonExporter_openPcbShapeDataJsonInNewTab(
  pcbShapeData: IPcbShapeData
) {
  const data = formatPcbDataForExport(pcbShapeData);
  const text = stringify({ data }, { maxLength: 180 });
  const win = window.open()!;
  win.document.write(`<pre>${text}</pre>`);
}
