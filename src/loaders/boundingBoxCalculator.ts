import { IFootprintNode, IGraphicsNode, IPoint, IRect } from '~/base';
import { vectorOp } from '~/funcs';

export function calculatePcbShapeBoundingBox(
  footprints: IFootprintNode[],
  nodes: IGraphicsNode[],
  outerMargin: number
): IRect {
  const points: IPoint[] = [];

  const fr = 9;
  footprints.forEach((fp) =>
    points.push(
      vectorOp.add(fp.at, { x: -fr, y: 0 }),
      vectorOp.add(fp.at, { x: fr, y: 0 }),
      vectorOp.add(fp.at, { x: 0, y: -fr }),
      vectorOp.add(fp.at, { x: 0, y: fr })
    )
  );

  nodes.forEach((node) => {
    if (node.type === 'path') {
      node.segments.forEach((seg) => points.push(...seg.points));
    } else if (node.type === 'grRect') {
      points.push(...node.points);
    } else if (node.type === 'grCircle') {
      const cx = node.center.x;
      const cy = node.center.y;
      const r = node.radius;
      points.push({ x: cx, y: cy - r });
      points.push({ x: cx, y: cy + r });
      points.push({ x: cx - r, y: cy });
      points.push({ x: cx + r, y: cy });
    } else if (node.type === 'grPoly') {
      points.push(...node.points);
    }
  });

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);

  const left = Math.min(...xs);
  const right = Math.max(...xs);
  const top = Math.min(...ys);
  const bottom = Math.max(...ys);
  const om = outerMargin;
  return {
    x: left - om,
    y: top - om,
    w: right - left + om * 2,
    h: bottom - top + om * 2,
  };
}
