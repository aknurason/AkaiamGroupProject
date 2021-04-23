import { Category, Product } from './types';

export const CATEGORIES: Array<Category> = [
  {
    id: 0,
    name: 'Creams',
    path: 'creams',
  },
  {
    id: 1,
    name: 'Gels',
    path: 'gels',
  },
  {
    id: 2,
    name: 'Shampoos',
    path: 'shampoos',
  },
  {
    id: 3,
    name: 'Scrubs',
    path: 'scrubs',
  },
  {
    id: 4,
    name: 'Vitamins',
    path: 'vitamins',
  },
  {
    id: 5,
    name: 'Shadows',
    path: 'shadows',
  },
  {
    id: 6,
    name: 'Lipsticks',
    path: 'lipticks',
  },
];

export const PRODUCTS: Array<Product> = [
  {
    id: 0,
    title: 'Product 1',
    subtitle: 'Great product',
    description:
      'Veniam culpa anim proident fugiat ea fugiat in excepteur nulla laborum Lorem cillum dolore enim. Cupidatat aliquip non dolor commodo dolore. Velit mollit pariatur sunt dolor. Culpa minim pariatur consectetur ullamco duis. Elit sint sint non ipsum exercitation minim ullamco cillum ex in et Lorem.',
    // category: CATEGORIES[0],
    categoryId: 0,
    price: 2000,
    imageURL: '/assets/img/placeholder.png',
  },
  {
    id: 1,
    title: 'Product 2',
    subtitle: 'Great product',
    description:
      'Excepteur enim irure non quis ullamco est tempor adipisicing non velit ut. Minim voluptate commodo veniam occaecat irure Lorem officia velit. Sint laborum nisi magna mollit aliqua do elit elit minim duis excepteur id mollit id. Esse sunt id minim ullamco ex velit laborum.',
    // category: CATEGORIES[1],
    categoryId: 1,
    price: 2000,
    imageURL: '/assets/img/placeholder.png',
  },
  {
    id: 2,
    title: 'Product 3',
    subtitle: 'Great product',
    description:
      'Pariatur in consequat ad aliquip duis ullamco cillum. Amet velit incididunt mollit aute. Occaecat mollit ullamco esse eiusmod enim labore duis minim. Elit tempor officia minim cupidatat aute sit commodo ad id culpa consectetur sit eu magna.',
    // category: CATEGORIES[2],
    categoryId: 2,
    price: 2000,
    imageURL: '/assets/img/placeholder.png',
  },
  {
    id: 3,
    title: 'Product 4',
    subtitle: 'Great product',
    description:
      'Dolor sint amet laboris incididunt amet eu fugiat reprehenderit do. In aliquip aliquip sit quis ullamco commodo et. Reprehenderit consectetur labore quis anim eu non cupidatat dolor ea labore quis. Do commodo officia sint occaecat voluptate est elit anim velit. Laboris culpa dolore excepteur aliquip consectetur fugiat anim exercitation fugiat consequat id.',
    // category: CATEGORIES[3],
    categoryId: 3,
    price: 2000,
    imageURL: '/assets/img/placeholder.png',
  },
  {
    id: 4,
    title: 'Product 5',
    subtitle: 'Great product',
    description:
      'Cupidatat tempor est sunt occaecat cillum duis incididunt non eu aliquip. Do aute ut incididunt Lorem irure sint dolor et. Velit nostrud labore ipsum duis elit incididunt quis deserunt incididunt ea culpa ullamco. Eiusmod sunt et veniam ad ipsum sint. Magna nulla sint ex quis occaecat. Laborum veniam exercitation ullamco eiusmod ad.',
    // category: CATEGORIES[4],
    categoryId: 4,
    price: 2000,
    imageURL: '/assets/img/placeholder.png',
  },
  {
    id: 5,
    title: 'Product 6',
    subtitle: 'Great product',
    description: 'Test short description',
    // category: CATEGORIES[5],
    categoryId: 5,
    price: 2000,
    imageURL: '/assets/img/placeholder.png',
  },
  {
    id: 6,
    title: 'Product 7',
    subtitle: 'Great product',
    description:
      'Deserunt occaecat ea culpa nostrud magna excepteur proident exercitation eu excepteur est cupidatat nulla aliquip. Ut duis minim nisi deserunt velit ea elit ullamco veniam cillum Lorem laborum sint aliquip. Eiusmod deserunt esse nulla qui eu veniam officia culpa in et enim.',
    // category: CATEGORIES[6],
    categoryId: 6,
    price: 2000,
    imageURL: '/assets/img/placeholder.png',
  },
  {
    id: 7,
    title: 'Product 8',
    subtitle: 'Great product',
    description:
      'Amet et fugiat consequat proident ex duis tempor velit sint officia tempor minim. Est incididunt sint aute laborum amet eu tempor reprehenderit proident consequat aliquip in dolore. Mollit laboris nisi ut do commodo quis consequat culpa adipisicing ipsum. Fugiat et dolor anim est mollit. Do ullamco occaecat amet velit nulla reprehenderit deserunt ad sint do non enim incididunt. Quis ullamco magna veniam id.',
    // category: CATEGORIES[0],
    categoryId: 6,
    price: 2000,
    imageURL: '/assets/img/placeholder.png',
  },
];
