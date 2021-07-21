// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import MenuListItem from '../menu-list-item';
// import WithRestoService from '../hoc';
// //import {menuLoaded, menuRequested, menuError, addedToCard, alertM} from '../../actions';
// import * as actions from '../../actions';
// import Spinner from '../spinner';
// import Error from '../error';
//
// import './menu-list.scss';

// class MenuList extends Component {
//
//     componentDidMount() {
//       console.log('menu-list-render');
//         this.props.menuRequested(); // Spinner
//         const {RestoService} = this.props; // приходит из hoc.Propvider
//          RestoService.getMenuItems()       // не создаем новый экземпляр а просто обращаемся!!
//               .then(res => this.props.menuLoaded(res))
//                 .catch(error => this.props.menuError());
//     }
//
//     alertMessage = () => {
//       alert('Добавлено в корзину');
//     }
//
//     render() {
//
//       const {menuItems, loading, error, addedToCard, alert, alertM} = this.props; // вытаскиваем массив меню из пропсов и значание loading
//
//       if(alert){
//         this.alertMessage();
//         alertM();
//       }
//
//       if (error){
//             return <Error/>
//         };
//
//       if (loading) {
//         return (
//           <div className="menu__list">
//               <div class = "spinner">
//                 <Spinner/>
//               </div>
//           </div>
//         );
//       };
//       const items = menuItems.map(menuItem => {
//                 return (
//                     <MenuListItem
//                       key = {menuItem.id}
//                       menuItem = {menuItem}
//                       onAddToCard = {() => addedToCard(menuItem.id)}
//
//                       />
//                 )
//             })
//
//         return (
//             <View items = {items}/>
//             )
//
//     }
// };
//
// const View = ({items}) => {
//
//     return (
//         <ul className="menu__list">
//             {items}
//         </ul>
//     )
// }
//
// const mapStateToProps = (state) => {  // получаем menu из sate который мы описали в reducer в menuItems
//   return {                            // КОТОРЫЙ отправляется ввиде пропсов в компонент MenuList
//     menuItems: state.menu,
//     loading: state.loading,
//     error: state.error,
//   //  addedToCard,
//     alert: state.alert
//
//   }
// };
//
// // теперь необходмо отправить экшн действие к нашему стору!
// // отправить результат запроса к серверу в store для записи в reducer в state
// // записывать в menu
// // теперь надо сказать компоненту какой именно экшн он должен диспатчить!
//
// // // без импорта экшена
// // const mapDispatchToProps = (dispatch) => { // функция с аргументов диспатч
// //   return {                                 // которая возвращает объект со свойсвтом
// //     menuLoaded: (newMenu) => {             // которое мы будем использовать внутри компонента
// //       dispatch ({                          // данные сервера (newMenu) отправляются в store
// //         type: 'MENU_LOADED',
// //         payload: newMenu
// //       })
// //     }
// //   }
// // };
//
// // // с импортом  экшена не самый оптимальный вариант
// // const mapDispatchToProps = (dispatch) => { // функция с аргументов диспатч
// //   return {                                 // которая возвращает объект со свойсвтом
// //     menuLoaded: (newMenu) => {             // которое мы будем использовать внутри компонента
// //       dispatch(menuLoaded(newMenu))
// //     }
// //   }
// // };
//
// //
// // const mapDispatchToProps =  {
// //       menuLoaded,
// //       menuRequested,
// //       menuError,
// //       addedToCard,
// //       alertM
// // };
// //
// // export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList)); // композиция hoc и получаем доступ к сервису
//
// export default WithRestoService()(connect(mapStateToProps, actions)(MenuList)); // композиция hoc и получаем доступ к сервису


// компонет MenuList связали с redux (reducer, store, actions)
// при переключении вкладок компонент размонтируется и компоненты отрисуются заново с запосом на сервер

//реализация с помощбю хука

import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import MenuListItem from '../menu-list-item';
import WithRestoService from '../hoc';
import * as actions from '../../actions';
import Spinner from '../spinner';
import Error from '../error';

import './menu-list.scss';

const MenuList = ({RestoService, menuItems, loading, error, addedToCard, alert, alertM, menuRequested, menuLoaded, menuError}) => {

  useEffect(()=> {
    menuRequested();
    RestoService.getMenuItems()
      .then(data => menuLoaded(data))
        .catch(error => menuError());
  },[RestoService, menuError, menuLoaded, menuRequested]);

  const alertMessage = () => {
       //alert('Добавлено в корзину');
       console.log('Add to card');
  };

  if(alert){
    alertMessage();
    alertM();
  }

  if (error){
    return <Error/>
  };

  if (loading) {
     return (
        <div className="menu__list">
            <div className = "spinner">
              <Spinner/>
              </div>
        </div>
          );
      };

  const items = menuItems.map(menuItem => {
          return (
                <MenuListItem
                        key = {menuItem.id}
                        menuItem = {menuItem}
                        onAddToCard = {() => addedToCard(menuItem.id)}
                    />
                  )
              });
    return (
            <View items = {items}/>
            );


  };

  const View = ({items}) => {

      return (
          <ul className="menu__list">
              {items}
          </ul>
      )
  }


const mapStatetoProps = (state) => ({
  menuItems: state.menu,
  loading: state.loading,
  error: state.error,
  alert: state.alert
});


export default WithRestoService()(connect(mapStatetoProps, actions)(MenuList));
