import { IPoint } from './types';
import { vectorOp } from './vectorOp';

export function degToRad(r: number) {
  return (r * Math.PI) / 180;
}

export function radToDeg(r: number) {
  return (r * 180) / Math.PI;
}

export function calculateCircleRadiusFrom3PointArc(points: IPoint[]): number {
  const [p0, p1, p2] = points;
  const mp = vectorOp.middle(p0, p2);
  const h = vectorOp.getDist(mp, p0);
  const d = vectorOp.getDist(mp, p1);
  const r = (d + h * h) / (2 * d);
  return r;
}
