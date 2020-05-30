import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentSTO from '../dtos/ICreateAppointmentDTO';
import IFindALlInMonthFromProviderDTO from '../dtos/IFindALlInMonthFromProviderDTO';
import IFindALlInDayFromProviderDTO from '../dtos/IFindALlInDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentSTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findALlInMonthFromProvider(
    data: IFindALlInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findALlInDayFromProvider(
    data: IFindALlInDayFromProviderDTO,
  ): Promise<Appointment[]>;
}
