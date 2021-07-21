import React, {Component} from 'react';
import { connect } from 'react-redux';
import WithRestoService from '../hoc/';
import Spinner from '../spinner';
import {menuLoaded, menuRequested, menuError, addedToCard} from '../../actions';
import Error from '../error';

import './item-page.css';

// class ItemPage extends Component {
//
//     componentDidMount() {
//         if( this.props.menuItems.length === 0){
//             this.props.menuRequested();
//
//             const {RestoService} = this.props;
//             RestoService.getMenuItems()
//                 .then(res => this.props.menuLoaded(res))
//                 .catch(error => this.props.menuError());
//         }
//     }
//
//     render() {
//         if(this.props.loading) {
//             return (
//                 <div className = "item_page">
//                     <Spinner/>
//                 </div>
//             )
//         }
//         const item = this.props.menuItems.find(el => +el.id === +this.props.match.params.id)
//         console.log(this.props.match);
//         const{title, url, category, price} = item;
//
//         return (
//             <div className = "item_page">
//                 <div className="menu__item item_block">
//                      <div className="menu__title">{title}</div>
//                     <img className="menu__img" src={url} alt={title}></img>
//                     <div className="menu__category">Category: <span>{category}</span></div>
//                     <div className="menu__price">Price: <span>{price}$</span></div>
//                     <button className="menu__btn">Add to cart</button>
//                     <span className = {`menu__category_Img ${category}`}></span>
//                 </div>
//             </div>
//         );
//     }
// }
//
// const mapStateToProps =  (state) =>{
//     return {
//         menuItems: state.menu,
//         loading: state.loading,
//         error: state.error
//     }
// }
//
// const mapDispatchToProps = {
//     menuLoaded: menuLoaded,
//     menuRequested,
//     menuError
// }
//
// export default WithRestoService ()( connect(mapStateToProps, mapDispatchToProps)(ItemPage) );

class ItemPage extends Component {
  componentWillMount() {
     this.props.menuRequested();
      const {RestoService} = this.props;

    //  console.log(id);
      RestoService.getMenuItems()
          .then(items => this.props.menuLoaded(items))
             .catch(error => this.props.menuError());


  }

  render(){
    const {menuItems, error, loading} = this.props;
    if (loading) {
      return <Spinner/>
    }

    if(error) {
      return <Error/>
    }

    ///  const {menuItems: {title, category, price, url}, error, loading} = this.props;

    const {id} = this.props.match.params;
    //const item = menuItems.find(items => +items.id === +id);
    //const {title, category, price, url} = item;
    const {title, category, price, url} = menuItems.find(items => +items.id === +id);
  //  console.log(menuItems);


    return (
      <div className = "item_page">
                      <div className="menu__item item_block">
                           <div className="menu__title">{title}</div>
                          <img className="menu__img" src={url} alt={title}></img>
                          <div className="menu__category">Category: <span>{category}</span></div>
                          <div className="menu__price">Price: <span>{price}$</span></div>
                          <span className = {`menu__category_Img ${category}`}
                                onClick = {() => this.props.addedToCard(+id)}></span>
                              <div className = "bc">
                            <button className="menu__btn" onClick = {() => this.props.addedToCard(+id)}>Add to cart</button>
                            <button className="menu__back" onClick = {() => this.props.history.push('/')}>Back</button>
                          </div>
                      </div>
                  </div>
    );
  }
}

const mapStateToProps = (state) => {  // получаем menu из sate который мы описали в reducer в menuItems
  return {                            // КОТОРЫЙ отправляется ввиде пропсов в компонент MenuList
    menuItems: state.menu,
    loading: state.loading,
    error: state.error,
  }
};

const mapDispatchToProps =  {
      menuLoaded,
      menuRequested,
      menuError,
      addedToCard
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(ItemPage));
