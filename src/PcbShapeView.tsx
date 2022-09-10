import { css, domStyled, FC, jsx } from 'alumina';
import { IGraphicsNode, IPcbShapeData } from './types';

type Props = {
  pcbShapeData: IPcbShapeData;
};

function getGraphicsNodePathSpec(node: IGraphicsNode): string {
  if (node.type === 'grRect') {
    const p0 = node.points[0];
    const p2 = node.points[1];
    const p1 = { x: p2.x, y: p0.y };
    const p3 = { x: p0.x, y: p2.y };
    return `M${p0.x},${p0.y} L${p1.x},${p1.y} L${p2.x},${p2.y} L${p3.x},${p3.y}Z`;
  } else if (node.type === 'grCircle') {
    const cp = node.center;
    const r = node.radius;
    return (
      `M${cp.x + r},${cp.y}` +
      `A${r},${r},0,0,0,${cp.x - r},${cp.y}` +
      `A${r},${r},0,0,0,${cp.x + r},${cp.y}Z`
    );
  } else if (node.type === 'grPoly') {
    return (
      node.points
        .map((p, idx) => `${idx === 0 ? 'M' : 'L'}${p.x},${p.y}`)
        .join(' ') + 'Z'
    );
  } else if (node.type === 'path') {
    return (
      node.segments
        .map((seg, idx) => {
          const headCmd = idx === 0 ? 'M' : 'L';
          if (seg.type === 'grLine') {
            const p0 = seg.points[0];
            const p1 = seg.points[1];
            return `${headCmd}${p0.x},${p0.y} L${p1.x},${p1.y}`;
          } else if (seg.type === 'grArc') {
            const p0 = seg.points[0];
            const p2 = seg.points[2];
            const r = seg.radius;
            const fSweep = seg.arcFlipped ? 0 : 1;
            return `${headCmd}${p0.x},${p0.y} A${r},${r},0,0,${fSweep},${p2.x},${p2.y}`;
            // return `${headCmd}${p0.x},${p0.y} L${p1.x},${p1.y} L${p2.x},${p2.y}`;
          } else if (seg.type === 'grCurve') {
            const p0 = seg.points[0];
            const p1 = seg.points[1];
            const p2 = seg.points[2];
            const p3 = seg.points[3];
            return `${headCmd}${p0.x},${p0.y} C${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;
          }
          return '';
        })
        .join(' ') + 'Z'
    );
  }
  throw new Error('invalid condition');
}

export const PcbShapeView: FC<Props> = ({ pcbShapeData }) => {
  const { boundingBox: bb, footprints, outlines } = pcbShapeData;
  const viewBoxSpec = `${bb.x} ${bb.y} ${bb.w} ${bb.h}`;
  const d = 2;
  const outlinePathSpec = outlines
    .map((gr) => getGraphicsNodePathSpec(gr))
    .join(' ');

  return domStyled(
    <svg viewBox={viewBoxSpec}>
      <g>
        <path class="outline" d={outlinePathSpec} />
      </g>

      <g>
        {footprints.map((fp, idx) => (
          <g
            key={idx}
            transform={`translate(${fp.at.x} ${fp.at.y}) rotate(${-(
              fp.at.angle || 0
            )})`}
          >
            <rect class="key-unit" x={-7} y={-7} width={14} height={14} />
            <line class="key-marker" x1={-d} y1={0} x2={d} y2={0} />
            <line class="key-marker" x1={0} y1={-d} x2={0} y2={d} />
          </g>
        ))}
      </g>
    </svg>,
    css`
      border: solid 1px #888;
      width: 800px;
      height: 400px;
      padding: 20px;

      .key-unit {
        fill: transparent;
        stroke: #f08;
        stroke-width: 0.3px;
      }

      .key-marker {
        stroke: #f08;
        stroke-width: 0.3px;
      }

      .outline {
        fill: #08f4;
        stroke: #08f;
        stroke-width: 0.3px;
        fill-rule: evenodd;
      }
    `
  );
};
