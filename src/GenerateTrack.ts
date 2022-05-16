import { ConferenceSlot } from "./model/SlotModel";
import { Track } from "./model/TrackModel";

export class GenerateTrack {
  private parseInput(rawInput: string): ConferenceSlot[] {
    return rawInput.split('\n').map((line: string) => this.seperateMinuteAndTalk(line));
  }

  private seperateMinuteAndTalk(trackLine: string): ConferenceSlot {
    var minutes = 5;
    if (!trackLine.includes("lightning")) {
      minutes = parseInt(trackLine.replace(/[^0-9]/g, ""));
    }
    return new ConferenceSlot(trackLine, minutes);
  }

  public schedule(rawInput: string): Track[] {
    let talks: ConferenceSlot[] = this.parseInput(rawInput).sort((a, b) => b.minutes - a.minutes)

    let tracks: Track[] = [new Track()];

    talks.forEach((talk: ConferenceSlot) => {
      tracks.forEach((track: Track) => {
        if (track.afternoonSession.checkSlotAvailability(talk.minutes)) {
          track.afternoonSession.addSlot(talk);
        } else if (track.morningSession.checkSlotAvailability(talk.minutes)) {
          track.morningSession.addSlot(talk);
        }
      });
    });

    tracks.forEach((track: Track) => {
      track.afternoonSession.addNetworkingEvent();
    })

    return tracks;
  }
}
