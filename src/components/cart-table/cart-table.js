import React from 'react';
import './cart-table.scss';
import {deleteFromCard, deleteAllItems} from '../../actions';
import WithRestoService from '../hoc';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';

const CartTable = ({items, deleteFromCard, RestoService, deleteAllItems, deliver, onJoke, onJoke2}) => {


  if( items.length === 0 && !deliver){
       return (<div className="cart__title"> Ваша корзина пуста :( </div>)
   };

   if(deliver){
      return (
        <div className="cart__title">
          Скоро мы с Вами свяжемся!
          <Link to ={"/"}>
            <div class = "ass">
                Заказать  <br/>  снова!
            </div>
          </Link>
        </div>
    )
   };
  // () => deleteFromCard(id)

    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                  items.map(item => {
                    const {title, price, url, id, count} = item;
                    return (
                      <div key = {id} className="cart__item">

                          <img src={url}
                                className="cart__item-img"
                                alt={title}></img>
                              <div className="cart__item-title">{title}</div>

                             <div className="cart__item-price">{price}$</div>
                             <div className="cart__item-title">Количество: {count} </div>
                          <div className="cart__close" onClick = {() => deleteFromCard(id)}>&times;</div>
                      </div>
                    )
                  })
                }
            </div>
            <button
              className = 'order'
              onClick = {() => {RestoService.setOrder(generateOrder(items)).then(data => {
                console.log(data);
              //  alert('Заказ сделан!');
                deleteAllItems();
              }
              )}}>
              Заказать!
            </button>
        </>
    );
};

const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item.id,
            count: item.count,
            title: item.title
        }
    })
    return newOrder;
}

const mapStateToProps = ({items, repeatItems, deliver}) => {
  return {
    items,
    deliver
  };
};

// const mapDispatchToProps = () => {
//   return {
//     onDelete: (id)=> {
//       console.log('Delete');
//     }
//   }
// };

const mapDispatchToProps =  {
      deleteFromCard,
      deleteAllItems,
};



export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));
