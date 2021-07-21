
// начальное состояние с пустым массивом которое передается как параметр поумолчанию в редьюсер
// добавили стейт для спиннера
const initialState = {
  menu: [],
  loading: true,
  error: false,
  items: [],
  total: 0,
  deliver: false,
  alert: false,
};

// создаем рэдьюсер

const reducer = (state = initialState, action) => {
  //console.log(state);
  switch (action.type) {
    case 'ALERT':
        return {
          ...state,
          alert: false
        }
    case 'MENU_LOADED':
          return {
            ...state,
            menu: action.payload,  // возвращаем ключ меню с данными с сервера
            loading: false,
            error: false         // отключаем спиннер
          };
          // отдельный экшн для показа спиннера каждый раз при переключении странницы
    case 'MENU_REQUESTED':
          return {
              ...state,
              menu: state.menu,
              loading: true,
              error: false,
              deliver: false
          };
    case 'MENU_ERROR':
          return {
                ...state,
                menu: state.menu,
                loading: false,
                error: true
          };
    case 'ITEM_ADD_TO_CART':
          const id = action.payload;
          const item = state.menu.find(item => item.id === id);
        //  console.log(state.menu);
        //  console.log(id);
        //  console.log(state.menu.find(item => item.id === id));

        //  console.log(id);
        //  console.log(state.items);
          const repeatItem = state.items.filter(item => item.id === id);
          if(repeatItem.length >= 1){
          //  console.log(repeatItem[0].id);
          //  console.log('ПОВТОР');
            const indexRepeat = state.items.findIndex(item => item.id === repeatItem[0].id);
          //  console.log(indexRepeat);
            const newItem ={
              ...repeatItem[0],
              count: ++repeatItem[0].count
            }
            return {
              ...state,
              items: [
                ...state.items.slice(0, indexRepeat),
                newItem,
                ...state.items.slice(indexRepeat + 1)
              ],
              total: state.total + newItem.price,
              alert: true
            }
          }
          const newItem = {
            title: item.title,
            price: item.price,
            url: item.url,
            id: item.id,
            count: 1
          };
          return {
            ...state,
            items: [
              ...state.items,
              newItem
            ],
            total: state.total + newItem.price,
            alert: true
          };
    case 'ITEM_DELETE_FROM_CART':
            const ind = action.payload;
            const index = state.items.findIndex(item => item.id === ind);
            if(state.items[index].count > 1){
              console.log('ОСТОРОЖНО!');
              const newItem = {
                ...state.items[index],
                count: --state.items[index].count
              };
              return {
                ...state,
                items: [...state.items.slice(0, index), newItem,  ...state.items.slice(index + 1)],
                total: state.total - newItem.price
              }
            };
            return {
              ...state,
              items: [...state.items.slice(0, index), ...state.items.slice(index + 1)],
              total: state.total - state.items[index].price,

            };
    case 'DELETE_ALL':
          return {
            ...state,
            items: [],
            total: 0,
            deliver: true
          }
    default:
          return state;
  }
};

export default reducer;
