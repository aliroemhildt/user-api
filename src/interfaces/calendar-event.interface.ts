interface CalendarEvent {
  eventId: string
  userId:string
  start:EventDate
  end: EventDate
  name: string
  description: string
}

interface EventDate {
  date: Date
  time: Date //not sure if this will be a date or not
}

export default CalendarEvent;