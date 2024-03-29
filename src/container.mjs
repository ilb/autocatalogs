import ManufacturerRepository from './repositories/ManufacturerRepository.mjs';
import ModelRepository from './repositories/ModelRepository.mjs';
import ModificationRepository from './repositories/ModificationRepository.mjs';
import ModelDriveRepository from './repositories/ModelDriveRepository.mjs';
import DriveRepository from './repositories/DriveRepository.mjs';
import ModelBodyRepository from './repositories/ModelBodyRepository.mjs';
import BodyRepository from './repositories/BodyRepository.mjs';
import TransmissionRepository from './repositories/TransmissionRepository.mjs';
import ModificationAdapter from './adapters/ModificationAdapter.mjs';
import CatalogService from './services/CatalogService.mjs';
import CatalogProvider from './providers/CatalogProvider.mjs';
import MainRepository from './repositories/MainRepository.mjs';
import HeartbeatRepository from './repositories/HeartbeatRepository.mjs';
// const production = process.env.ILB_SYSID == 'PRODUCTION';
const container = new Map();

container.set('manufacturerRepository', ManufacturerRepository);
container.set('modelRepository', ModelRepository);
container.set('modificationRepository', ModificationRepository);
container.set('modelDriveRepository', ModelDriveRepository);
container.set('driveRepository', DriveRepository);
container.set('modelBodyRepository', ModelBodyRepository);
container.set('heartbeatRepository', HeartbeatRepository);
container.set('bodyRepository', BodyRepository);
container.set('transmissionRepository', TransmissionRepository);
container.set('modificationAdapter', ModificationAdapter);
container.set('catalogService', CatalogService);
container.set('catalogProvider', CatalogProvider);
container.set('mainRepository', MainRepository);

export default container;
