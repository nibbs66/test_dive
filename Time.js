import {addHours, eachHourOfInterval, endOfToday, format, startOfToday, subHours} from "date-fns";

export  const timeSetter = new Date()
export const time = addHours(timeSetter.setMinutes(0), 1)
export const currentMinute = (new Date().getHours()  * 60)
export  const today = startOfToday()
export  const startDay = addHours(today, 5)
export  const midnight = endOfToday()
export  const endDay = subHours(midnight, 1)
export  const hours = eachHourOfInterval({start: startDay, end: endDay})
export const currentDate = (format(today, 'MMMM dd yyyy'))
export const colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]
