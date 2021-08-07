import * as R from 'ramda';


export class Paginator<T> {
  currentPage = 1;
  data: T[] = [];
  perPage = 10;
  total = 0;
  createModelFn?: (...params: any) => T;

  constructor(object = null) {
    this.assign(object);
  }

  assign(object) {
    if (!object) {
      return this;
    }
    Object.assign(this, object);
    if (this.createModelFn) {
      this.map();
    }
  }

  isNotEmpty(): boolean {
    return !!(this.data.length);
  }

  isEmpty(): boolean {
    return !(this.isNotEmpty());
  }

  showCurrentItemIndex(itemIndex: number) {
    return (this.perPage * (this.currentPage - 1)) + itemIndex;
  }

  map(createModelFn: (...params: any) => T = null) {
    createModelFn = this.createModelFn ? this.createModelFn : createModelFn;

    if (!R.is(Array, this.data)) {
      this.data = [];
      return this;
    }
    this.data = this.data.map(createModelFn);

    return this;
  }

  setCreateModelFn(fn: (...params) => T) {
    this.createModelFn = fn;
  }

  reset() {
    this.currentPage = 1;
    this.data = [];
    this.perPage = 10;
    this.total = 0;
  }

  setValue(currentPage: number, total: number, data: T[]) {
    this.currentPage = currentPage;
    this.total = total;
    if (R.is(Array, data)) {
      this.data = (data as []).map(this.createModelFn);
    }
  }
}
