import moment from "moment";
export class ConferenceSlot {
  private _name: string;
  private _minutes: number;
  public startTime: moment.Moment | undefined | null = null;

  constructor(name: string, minutes: number) {
    this._name = name;
    this._minutes = minutes;
  }

  get name(): string {
    return this._name;
  }

  get minutes(): number {
    return this._minutes;
  }
}
