import React, {Component} from 'react';
import Error from '../error';

// граница ошибок
// компонент класс который содержит componentDidCatch и србабатывает если ниже произошла ошибка
// если нет ошибок то отрендерится структура внутри ErrorBoundry (this.props.children)

export default class ErrorBoundry extends Component {

    state = {
      error: false
    };

    componentDidCatch(){
      this.setState({error: true});
    };

    render() {
        if(this.state.error){
          return <Error/>
        }
        return this.props.children;
    };
}
