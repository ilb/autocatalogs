import { BODIES, TRANSMISSIONS } from '../constants.mjs';

export default class ModificationMapper {
	constructor({ prismaService }) {
		this.prismaService = prismaService;
	}
	/**
	 *
	 * @param {Array} modificationsFromCatalog
	 * @returns {Object}
	 * modifications - массив отформатированных моделей для сохранения данных,
	 * bodies - массив отформатированных типов кузовов сохранения данных
	 * transmissions - массив отформатированных типов трансмиссий сохранения данных
	 */
	map(modificationsFromCatalog) {
		const table = this.prismaService.modificationTable;
		const bodies = [];
		const transmissions = [];
		// const engines = [];

		const modifications = modificationsFromCatalog.map((item) => {
			const { Modification, Model, Transmission, BodyType, YearFrom, EngineSize, Power } = item;

			this.bodyMapper(bodies, BodyType, BODIES);
			this.transmissionMapper(transmissions, Transmission, TRANSMISSIONS);
			// this.paramMapper(engines, EngineSize);

			const res = {
				id: Number(Modification[0].id[0]),
				[table.carmodelid]: Number(Model[0].id[0]),
				[table.cartransmissionid]: Number(Transmission[0].id[0]),
				[table.carbodyid]: Number(BodyType[0].id[0]),
				[table.caryear]: Number(YearFrom[0]._),
				[table.enginecapacity]: Number(EngineSize[0]._),
				[table.enginepower]: Number(Power[0]._),
				[table.name]: Modification[0]._
			};
			res.code = this.codeAdapter(res.enginepower, res.enginecapacity);

			return res;
		});
		// console.log({ transmissions, bodies });
		return { modifications, bodies, transmissions };
	}

	/**
	 * Метод формирует и возвращает параметр для оценки code
	 * @param {Number} enginepower мощность двигателя
	 * @param {Number} enginecapacity обьем в литрах
	 * @return {String} MANUAL__enginepower__enginecapacity
	 */
	codeAdapter(enginepower, enginecapacity) {
		const format = (value) => {
			const more = value.replaceAll('.', '_');
			const less = value + '_0';
			return value.includes('.') ? more : less;
		};
		return `MANUAL__${enginepower}__${format(enginecapacity.toString())}`;
	}

	/**
	 *  Метод формирует массив с выбранными параметрами убирая повторяющиеся элементы
	 *  реализован для единоразового обхода по массиву параметров модификации
	 * @param {Array} arr массив для сохранения выделенных параметров
	 * @param {Object} value выбранный параметр из обьекта с параметрами модификации
	 * @param {Array} types массив с параметрами модификаций зашитых в платформе
	 *
	 */
	bodyMapper(arr, value, types) {
		const table = this.prismaService.bodyTable;
		const typeCode = types.find(({ name }) => name === value[0]._.toLowerCase());
		const formatValue = {
			id: Number(value[0].id[0]),
			[table.name]: value[0]._.toLowerCase(),
			[table.code]: typeCode.code,
			[table.avitocode]: typeCode.code
		};
		if (!arr.map(({ id }) => id).includes(formatValue.id)) {
			arr.push(formatValue);
		}
	}

	/**
	 *  Метод формирует массив с выбранными параметрами убирая повторяющиеся элементы
	 *  реализован для единоразового обхода по массиву параметров модификации
	 * @param {Array} arr массив для сохранения выделенных параметров
	 * @param {Object} value выбранный параметр из обьекта с параметрами модификации
	 * @param {Array} types массив с параметрами модификаций зашитых в платформе
	 *
	 */
	transmissionMapper(arr, value, types) {
		const table = this.prismaService.transmissionTable;
		const typeCode = types.find(({ name }) => name === value[0]._.toLowerCase());
		const formatValue = {
			id: Number(value[0].id[0]),
			[table.name]: value[0]._.toLowerCase(),
			[table.code]: typeCode.code,
			[table.avitocode]: typeCode.code
		};
		if (!arr.map(({ id }) => id).includes(formatValue.id)) {
			arr.push(formatValue);
		}
	}
}