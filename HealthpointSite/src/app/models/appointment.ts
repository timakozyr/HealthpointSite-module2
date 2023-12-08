export class Appointment {
    id: number;
    patientId: number;
    patientFIO: string = '';
    doctorId: number;
    doctorFIO: string = '';
    medServiceId: number;
    medService: string = '';
    cabinet: number = 0;
    date: Date;
}