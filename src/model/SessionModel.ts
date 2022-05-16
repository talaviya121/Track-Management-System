import moment from "moment";
import { ConferenceSlot } from "./SlotModel";

export class Session {
  private maxSessionLength: number;
  private startTime: moment.Moment;

  private _slots: ConferenceSlot[] = [];

  constructor(maxSessionLength: number, startTime: moment.Moment) {
    this.maxSessionLength = maxSessionLength;
    this.startTime = startTime;
  }

  public checkSlotAvailability(minutes: number): boolean {
    return minutes <= (
      this.maxSessionLength - this.slots?.reduce((prev, next) => prev + next.minutes, 0)
    );
  }

  public addSlot(slot: ConferenceSlot): boolean {
    if (!this.checkSlotAvailability(slot.minutes)) {
      return false;
    } else {
      // Default start time is start of session
      slot.startTime = this.startTime.clone();

      if (this._slots.length > 0) {
        slot.startTime = this._slots[this._slots?.length - 1]?.startTime?.clone().add(this._slots[this._slots?.length - 1]?.minutes, "minutes");
      }

      this._slots.push(slot);
      return true;
    }
  }

  get slots(): ConferenceSlot[] {
    return this._slots;
  }

  public addNetworkingEvent(): boolean {
    let networkingEvent: ConferenceSlot = new ConferenceSlot("Networking Event", 60),
      lastslot = this._slots[this._slots?.length - 1];

    networkingEvent.startTime = moment().set({
      hour: 16,
      minute: 0,
      second: 0,
    });

    if (
      lastslot &&
      lastslot.startTime?.clone().add(lastslot.minutes, "minutes").isAfter(moment().set({ hour: 15, minute: 59, second: 59 }))
    ) {
      networkingEvent.startTime = lastslot.startTime
        .clone()
        .add(lastslot.minutes, "minutes");
    }

    this._slots.push(networkingEvent);
    return true;
  }
}
