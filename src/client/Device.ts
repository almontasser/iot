export class Device {
  id: string; // device id
  ld: number; // distance from left wall in meters
  rd: number; // distance from right wall in meters
  sys: number; // systolic blood pressure
  dia: number; // diastolic blood pressure
  hr: number; // heart rate
  spo2: number; // blood oxygen saturation
  color: string; // color of dot
  opacity: number; // opacity of dot
  employee?: string; // employee id
  lastUpdate?: Date;
}
