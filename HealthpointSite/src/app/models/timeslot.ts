export class TimeSlot {
    id: number
    start_time: string

    static getAllTimeSlots(): TimeSlot[] {
        return [
            {id: 1, start_time: '10:00'},
            {id: 2, start_time: '10:30'},
            {id: 3, start_time: '11:00'},
            {id: 4, start_time: '11:30'},
            {id: 5, start_time: '12:00'},
            {id: 6, start_time: '12:30'},
            {id: 7, start_time: '13:00'},
            {id: 8, start_time: '13:30'},
            {id: 9, start_time: '14:00'},
            {id: 10, start_time: '14:30'},
            {id: 11, start_time: '15:00'},
            {id: 12, start_time: '15:30'},
            {id: 13, start_time: '16:00'},
            {id: 14, start_time: '16:30'},
            {id: 15, start_time: '17:00'},
            {id: 16, start_time: '17:30'},
            {id: 17, start_time: '18:00'},
            {id: 18, start_time: '18:30'},
        ]
    }

    static getTimeBySlot(slot): string {        
        return TimeSlot.getAllTimeSlots().find(s => s.id == slot)?.start_time ?? "";
    }
}