interface CalendarEvent {
  eventId: string
  userId:string
  start:EventDate
  end: EventDate
  name: string
  description: string
}

interface EventDate {
  start: {
    date: Date
    time: Date
  }
}