"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeNotificationRepository;
let fakeAppointmentsRepository;
let fakeCacheProvider;
let createAppointment;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeNotificationRepository = new _FakeNotificationsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentsRepository, fakeNotificationRepository, fakeCacheProvider);
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 12).getTime();
    });
    const appointmet = await createAppointment.execute({
      date: new Date(2021, 4, 10, 13),
      user_id: '321321321',
      provider_id: '123123123'
    });
    expect(appointmet).toHaveProperty('id');
    expect(appointmet.user_id).toBe('321321321');
    expect(appointmet.provider_id).toBe('123123123');
  });
  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 5, 10, 11);
    await createAppointment.execute({
      date: appointmentDate,
      user_id: '321321321',
      provider_id: '123123123'
    });
    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: '321321321',
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointments on a paste date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 5, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2021, 5, 10, 11),
      user_id: '321321321',
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 5, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2021, 5, 10, 13),
      user_id: '123123123',
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment before 8:00am neither after 5:00pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 5, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2021, 5, 10, 7),
      user_id: '321321321',
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      date: new Date(2021, 5, 10, 18),
      user_id: '321321321',
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});