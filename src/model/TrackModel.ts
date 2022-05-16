import moment from "moment";
import { Session } from "./SessionModel";

export const MORNING_SESSION_LENGTH: number = 180;
export const AFTERNOON_SESSION_LENGTH: number = 240;

export class Track {
  public morningSession: Session;
  public afternoonSession: Session;

  constructor() {
    this.morningSession = new Session(
      MORNING_SESSION_LENGTH,
      moment().set({ hour: 9, minute: 0, second: 0 })
    );
    this.afternoonSession = new Session(
      AFTERNOON_SESSION_LENGTH,
      moment().set({ hour: 13, minute: 0, second: 0 })
    );
  }
}
