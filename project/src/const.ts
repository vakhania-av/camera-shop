// constants
export const MAX_RATING = 5;

export const START_PAGE = 1;

export const CAMERAS_PER_PAGE = 9;

export const TOTAL_COUNT_HEADER = 'x-total-count';

export const MODAL_OPEN_CLASS = 'scroll-lock';

// API + Backend

export enum AppRoute {
  Root = '/',
  Product = ':id',
  Basket = '/basket',
  Camera = 'cameras/',
  Catalog = 'catalog/:page'
}

export enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo'
}

export enum FetchStatus {
  Success = 'Success',
  Pending = 'Pending',
  Idle = 'Idle',
  Error = 'Error'
}

// Products + Sorting

export enum Category {
  Photocamera = 'Фотокамера',
  Videocamera = 'Видеокамера'
}

export enum CameraLevel {
  Zero = 'Нулевой',
  Amateur = 'Любительский',
  Pro = 'Профессиональный'
}

export enum CameraType {
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Snapshot = 'Моментальная',
  Collection = 'Коллекционная'
}

export const SortOrder = {
  Asc: { name: 'up', value: 'По возрастанию' },
  Desc: { name: 'down', value: 'По убыванию' }
} as const;

export enum SortType {
  SortPrice = 'по цене',
  SortPopular = 'по популярности'
}

export enum NameSpace {
  Camera = 'CAMERA',
  Ui = 'UI',
  Modals = 'MODALS'
}
