export default class UpdateCatalogs {
  constructor({ catalogService }) {
    this.catalogService = catalogService;
  }

  async process() {
    await this.catalogService.updateData();
  }
}
