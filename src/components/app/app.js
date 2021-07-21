import React from 'react';
import {MainPage, CartPage, ItemPage} from '../pages';
//import MenuListItem from '../menu-list-item';
import AppHeader from '../app-header';

import Background from './food-bg.jpg';
// для работы с сервисои импортируем HOC
// для использования смотреть конец
// 111 не будетвызываться сервис
//import WithRestoService from '../hoc';

import { Route, Switch } from 'react-router-dom';

const App = ({RestoService}) => {

  //console.log(RestoService.getMenuItems());
  // RestoService.getMenuItems()
  //   .then(menu => console.log(menu))
  //     .catch(error => console.log('ОШИБКА!'));



    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <AppHeader/>
            <Switch>
                <Route path='/' exact component={MainPage}/>
                <Route path='/cart'  component={CartPage}/>
                <Route path = '/:id' component={ItemPage}/>
            </Switch>
        </div>
    )
}

//export default WithRestoService()(App);
// вернется функция сфункция с компонентом App В качестве аргумента и обернет его в Consumer

export default App;
