import VehicleViewModel from "../vehicles/VehicleViewModel"
import VehicleEventModel from "../vehicles/VehicleEventModel"

import { createConnection } from "typeorm";

export class StoreService {
  constructor(reducers) {
    this.reducers = reducers;
    const config: any = {
      type: "sqljs",
      location: "demo",
      autoSave: true,
      entities: [
        VehicleViewModel,
        VehicleEventModel
      ],
      logging: ['query', 'schema'],
      synchronize: true
    }
    createConnection(config).then(connection => {
      this.vehicleViewRepository = connection.getRepository(VehicleViewModel)
      this.vehicleEventRepository = connection.getRepository(VehicleEventModel)
    })
  }
  reducers = null
  vehicleViewRepository = null
  vehicleEventRepository = null

  async store(events) {
    for (const event of events) {
      await this.vehicleEventRepository.save({ eventData: event });
      const viewInDb = await this.vehicleViewRepository.findOne({ id: event.id });

      if (viewInDb) {
        const acc = {
          id: viewInDb.id,
          amount: viewInDb.amount,
          currency: viewInDb.currency,
          createdAt: viewInDb.createdAt
        };
        const view = this.reducers.reduce((view, reducer) => reducer(event, view), acc);
        viewInDb.id = view.id;
        viewInDb.amount = view.amount;
        viewInDb.currency = view.currency;
        viewInDb.createdAt = view.createdAt;

        await this.vehicleViewRepository.save(viewInDb);

      } else {
        const view = this.reducers.reduce((view, reducer) => reducer(event, view), {});
        await this.vehicleViewRepository.save(view);
      }
    }

    const lastEvent = events[events.length - 1];
    const endView = await VehicleViewModel.findOne(lastEvent.id);

    return endView;
  }

  getVehicleView(id) {
    return VehicleViewModel.findOne(id);
  }
}