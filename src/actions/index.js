// первый экшн криэтор объект с type и payload в котором будет новое меню с сервера (newMenu)

const menuLoaded = (newMenu) => {
  return {
    type: 'MENU_LOADED',
    payload: newMenu
  }
};

// экшн криэтор для спиннера
const menuRequested = () => {
  return {
    type: 'MENU_REQUESTED',
  }
};

// экшн криэтор для спиннера
const addedToCard = (id) => {
  return {
    type: 'ITEM_ADD_TO_CART',
    payload: id
  }
};

const deleteFromCard = (id) => {
  return {
    type: 'ITEM_DELETE_FROM_CART',
    payload: id
  }
};

// экшн криэтор для ошибки
const menuError = () => {
  return {
    type: 'MENU_ERROR',
  }
};

// экшн криэтор для ошибки
const deleteAllItems = () => {
  return {
    type: 'DELETE_ALL',
  }
};

const alertM = () => ({type: 'ALERT'});

export {
  menuLoaded,
  menuRequested,
  menuError,
  addedToCard,
  deleteFromCard,
  deleteAllItems,
  alertM
};
