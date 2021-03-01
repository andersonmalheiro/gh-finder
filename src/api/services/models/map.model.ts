export interface MapResult {
  x: number;
  y: number;
  label: string;
  bounds: [[number, number], [number, number]];
  raw: any;
  lat?: string;
  lon?: string;
}
