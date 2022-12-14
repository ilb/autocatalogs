import Repository from './Repository.mjs';

export default class BodyRepository extends Repository {
  setupTable() {
    this.table = 'VehicleBody';
  }

  /**
   * Метод для пакетного сохранения типов кузова авто из каталога
   * @param {Array} bodies типы кузова авто полученные из каталога
   */
  saveMany(bodies) {
    return this.model.createMany({
      data: bodies,
      skipDuplicates: true
    });
  }

  deleteMany() {
    return this.model.deleteMany({});
  }

  getList({ query, count }) {
    return this.model.findMany({
      where: {
        ...(query && {
          name: {
            contains: query,
            mode: 'insensitive'
          }
        })
      },
      ...(count && { take: parseInt(count) })
    });
  }
}
