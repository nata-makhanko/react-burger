import styles from './order-list-item-detailes.module.css';
import moment from 'moment';
import 'moment/locale/ru';
import {useEffect, useState} from 'react'; 
import { useSelector, useDispatch } from "../../hooks";
import { useParams } from "react-router-dom";
import { renderStatus, renderOrderList, renderOrderSumList } from "../../utils/render-functions/render-functions";
import { getOrderList } from '../../services/actions/order-details';


type TUseParams = {
    orderNumber: string
  }

const OrderListItemDetailes = () => {
    const [orderIngresints, setOrderIngresints] = useState([{
        _id: '',
        name: '',
        type: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0,
        count: 0,
    }]);
    let { orderNumber } = useParams<TUseParams>();
    const {ingredients} = useSelector(state => state.burgerIngredients);
    const {orderList, isLoadedOrderList} = useSelector(state => state.orderDetails);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrderList(orderNumber));
    }, []);
    useEffect(() => {
        if(isLoadedOrderList && orderList.length > 0 && ingredients.length > 0) {
            setOrderIngresints(getOrdersIngredients());
        }
    }, [isLoadedOrderList, orderList, ingredients])

    const getOrdersIngredients= () => {
        let getCountOfIngredients = Object.entries(orderList[0].ingredients.reduce((acc: {[key: string]: number}, i) => {
            if (acc.hasOwnProperty(i)) {
              acc[i] += 1;
            } else {
              acc[i] = 1;
            }
            return acc;
          },{})).map(elem => {
            return {_id: elem[0], count: elem[1]};
          });
    
        let getInfoOfIngredients = getCountOfIngredients.map(ingredient => {
            return ingredients.filter(ingredientBurger => ingredientBurger._id === ingredient._id)
        }).flat();

        let concatCountAndInfoIngredients = getCountOfIngredients.map((ingredient, index) => ({...ingredient, ...getInfoOfIngredients[index]}))

        return concatCountAndInfoIngredients;
    }

    return (
        <section className={`${styles.wrp}`}>
            {isLoadedOrderList
            ? 
            <>
                <p className={`${styles.number} text text_type_digits-default mb-5`}>#{orderList[0].number}</p>
                <p className="text text_type_main-medium mb-2">{orderList[0].name}</p>
                {renderStatus(orderList[0].status)}
                <p className="text text_type_main-medium mt-15 mb-4">Состав:</p>
                <div className={`${styles.order__list} mb-10`}>
                    {renderOrderList(orderIngresints)}
                </div>
                <div className={styles.wrp__date_price}>
                    <p className="text text_type_main-default text_color_inactive">{moment(orderList[0].createdAt).calendar()}</p>
                    {renderOrderSumList(orderIngresints)}
                </div>
            </>
            : <p className="text text_type_main-medium">Загрузка данных...</p>}
        </section>
    )

}

export default OrderListItemDetailes;