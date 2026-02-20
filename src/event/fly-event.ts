export class FlyEvent {
  constructor(payload: { name: string; speed: number }) {
    this.name = payload.name;
    this.speed = payload.speed;
  }

  name: string;
  speed: number;
}
