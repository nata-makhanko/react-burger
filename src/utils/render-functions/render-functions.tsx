import {TSelectedOrderIngredients} from '../types';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './render-functions.module.css';

export const renderStatus = (status: string) => {
    switch (status) { 
        case 'done': {
            return <p className="text text_type_main-default" style={{color: '#00CCCC'}}>Выполнен</p>
        }
        case 'created': {
            return <p className="text text_type_main-default">Создан</p>
        }
        case 'pending': {
            return <p className="text text_type_main-default">Готовится</p>
        }
        default: {
            return <p className="text text_type_main-default">Статус заказа неизвестен</p>
        }
    }
}



export const renderOrderList = (orderIngredients:TSelectedOrderIngredients[]) => {
    return orderIngredients.map(ingredient => {
        const {_id, image_mobile, name, count, price } = ingredient;
        return (
        <div className={`${styles.wrp__order_list} mb-4`} key={_id}>
            <div className={styles.wrp__order_img_name}>
                <div className={`${styles.wrp__order_img} mr-3`}>
                    <img src={image_mobile} alt={name} className={styles.img}/>
                </div>
                <p className={`${styles.name} text text_type_main-default`}>{name}</p>
            </div>
            <div className={`${styles.wrp__order_count_price} mr-6`}>
                <p className="text text_type_digits-default mr-1">{count}</p>
                <p className="text text_type_digits-default mr-1">x</p>
                <p className="text text_type_digits-default mr-1">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
        )

    })
}

export const renderOrderSumList = (orderIngredients:TSelectedOrderIngredients[]) => {
    const sum = orderIngredients.reduce((acc, ingredient) => {
        const {count, price} = ingredient;
        return acc + count*price;
    }, 0);

    return (
    <div className={styles.wrp__sum}>
        <p className="text text_type_digits-default mr-2">{sum}</p>
        <CurrencyIcon type="primary" />
    </div>
    )
}



