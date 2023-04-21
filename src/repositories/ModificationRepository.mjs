import Repository from './Repository.mjs';

export default class ModificationRepository extends Repository {
  setupTable() {
    this.table = 'VehicleModification'
  }

  saveMany(modifications) {
    return this.model.createMany({
      data: modifications,
      skipDuplicates: true
    });
  }

  upsert(data) {
    return data.map((item) => {
      const {
        id,
        vehicleModelId, 
        vehicleTransmissionId, 
        vehicleBodyId, 
        vehicleDriveId, 
        vehicleYearFrom, 
        vehicleYearTo, 
        vehicleEnginePower, 
        vehicleEngineCapacity, 
        name, 
        ...overData
      } = item
      const unique = {
        id, 
        vehicleModelId, 
        vehicleTransmissionId, 
        vehicleBodyId, 
        vehicleDriveId, 
        vehicleYearFrom, 
        vehicleYearTo, 
        vehicleEnginePower, 
        vehicleEngineCapacity, 
        name
      }
      return this.model.upsert({
        where: {
          id_vehicleModelId_vehicleTransmissionId_vehicleBodyId_vehicleDriveId_vehicleYearFrom_vehicleYearTo_vehicleEnginePower_vehicleEngineCapacity_name: unique
        },
        update: overData,
        create: item
      })
    })
  }

  deleteMany() {
    return this.model.deleteMany();
  }

  /**
   * @param {number|string} count
   * @param {string} query
   * @param {string} modelName
   * @param {number} modelId
   * @param withBody
   * @param withTransmission
   * @return {*}
   */
  getList({ count, query, modelName, modelId, withBody = false, withTransmission = false }) {
    return this.model.findMany({
      where: {
        ...(query && {
          name: {
            contains: query,
            mode: 'insensitive'
          }
        }),
        ...(modelId && {
          vehicleModelId: modelId
        }),
        ...(modelName && {
          vehicleModel: {
            name: modelName
          }
        }),
      },
      include: {
        vehicleTransmission: withTransmission,
        vehicleBody: withBody,
      },
      ...(count && { take: parseInt(count) })
    });
  }
}
