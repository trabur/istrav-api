import * as events from "./events"

export default function (event, view) {
  switch (event.type) {
    case events.eventTypes.createVehicle:
      return {
        id: event.id,
        name: event.name,
        lat: event.lat,
        long: event.long
      };

    default:
      return view;
  }
}