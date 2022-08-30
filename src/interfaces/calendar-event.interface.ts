export default interface CalendarEvent {
  eventId: string
  userId:string
  start: Date //date and time
  end: Date //date and time
  name: string
  description: string
}
