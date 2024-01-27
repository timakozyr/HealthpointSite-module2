export class Appointment {
    id: number = 0;
    patientId: number;
    patientFIO: string = '';
    doctorId: number;
    doctorFIO: string = '';
    medServiceId: number;
    medService: string = '';
    cabinet: number = 0;
    date: Date = new Date();
    time: number = 1; //string = (new Date()).toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric' });
}