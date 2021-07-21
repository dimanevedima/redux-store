// создаем сервис для проверкина работу.

export default class RestoService {

  _apiBase = 'http://localhost:3004';

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`);
        };
    return await res.json();
  };

  getMenuItems = async () => {
    return await this.getResource('/menu/');
  };

  getItem = async (id) =>  {
       const res = await this.getMenuItems();
       const item = res.find( (el) => {
           console.log(`el.id: ${el.id}, id: ${id}`);
           return el.id === +id;
       })
       return item;
   };

   getOrderNumber = async () => {
      const res = await this.getResource('/orders/');
      return res.length + 1;
   };

   setOrder = async  (order) => {
         const number = await this.getOrderNumber();
         const newOrder = {
             id: number,
             order: order
         }
         const response = await fetch(`${this._apiBase}/orders`, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json;charset=utf-8'
             },
             body: JSON.stringify(newOrder)
         });
         if (!response.ok){
             throw new Error('json error');
         }
         return await response.json();
     }


};
