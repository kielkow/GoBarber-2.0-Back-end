import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const cacheData = await this.cacheProvider.recover('test');

    console.log(cacheData);

    const appointments = await this.appointmentsRepository.findALlInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    // await this.cacheProvider.save('test', 'test');

    return appointments;
  }
}

export default ListProviderAppointmentsService;
