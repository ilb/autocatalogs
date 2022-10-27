export default class BodyRepository {
	constructor({ prisma }) {
		this.prisma = prisma;
	}

	/**
	 * Метод для пакетного сохранения типов кузова авто из каталога
	 * @param {Array} bodies типы кузова авто полученные из каталога
	 */
	saveMany(bodies) {
		return this.prisma.vehicleBody.createMany({
			data: bodies,
			skipDuplicates: true
		});
	}

	deleteMany() {
		return this.prisma.vehicleBody.deleteMany({});
	}

	getBody({bodyId}) {
		return this.prisma.vehicleBody.findMany({
			where: {
				id: {in: bodyId}
			},
			select: {
				name: true,
				code: true,
				avitoCode: true
			}
		})
	}
}
