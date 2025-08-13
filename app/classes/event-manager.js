export const EVENTS = {
  userChoiceEvent: "rps-game:user-choice:click",
};

export class EventManager {
  static createEvent(customEvent, details) {
    return new CustomEvent(customEvent, {
      bubbles: true,
      cancelable: true,
      detail: details,
    });
  }

  static getUserChoiceEvent(userChoice) {
    return EventManager.createEvent(EVENTS.userChoiceEvent, userChoice);
  }
}
