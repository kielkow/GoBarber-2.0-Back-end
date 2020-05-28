import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentSTO from '../dtos/ICreateAppointmentDTO';
import IFindALlInMonthFromProviderDTO from '../dtos/IFindALlInMonthFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentSTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findALlInMonthFromProvider(
    data: IFindALlInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
}
