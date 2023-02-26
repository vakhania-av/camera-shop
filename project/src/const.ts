export enum AppRoute {
  Root = '/',
  Product = ':id',
  Basket = '/basket',
  Camera = 'cameras/',
}

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
