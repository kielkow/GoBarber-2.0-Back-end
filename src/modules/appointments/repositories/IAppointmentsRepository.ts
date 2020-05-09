import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentSTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentSTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
