import React from 'react';
import RestoServiceContext from '../resto-service-context';

// Компонент высшего порядка где мы спрячем использование Consumer. Теперь каждый раз при необхожимости Consumer
// мы не будем создавать RestoServiceContext а просто будем использовать компонент HOC
// HOC функция которая возвращает функцию где аргумент какой то компонент (Wrapped)
// функция получает RestoService как аргумент из Provider и возвращает переданные props и сам RestoService
// Wrapped + props + RestoService с помощью контекста

const WithRestoService = () => (Wrapped) => {
    return (props) => {
      return (
        <RestoServiceContext.Consumer>
            {
              (RestoService) => {
                return <Wrapped {...props} RestoService ={RestoService}/>
              }
            }
        </RestoServiceContext.Consumer>
      )
    };
};

export default WithRestoService;
