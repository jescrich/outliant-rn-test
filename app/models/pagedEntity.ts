export default class PagedEntity<T> {
    data: T[];

    page: number;

    pageSize: number;

    totalRecords: number;

    totalPages: number;

    constructor() {
      this.data = [] as T[];
      this.page = 1;
      this.totalRecords = 0;
      this.totalPages = 0;
      this.pageSize = 6;
    }
}
