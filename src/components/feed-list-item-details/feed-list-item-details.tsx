import styles from './feed-list-item-details.module.css';
import moment from 'moment';
import 'moment/locale/ru';
import { useSelector } from "../../hooks";
import { useParams } from "react-router-dom";
import { renderStatus, renderOrderList, renderOrderSumList } from "../../utils/render-functions/render-functions";

type TUseParams = {
  orderNumber: string
}


const FeedListItemDetails = () => {
    let { orderNumber } = useParams<TUseParams>();
    const {wsConnected, messages} = useSelector(state => state.ws);
    const {ingredients} = useSelector(state => state.burgerIngredients);
    const selectedOrder = messages[0].orders.find(order => order.number === Number(orderNumber));
    let getCountOfIngredients = selectedOrder ? Object.entries(selectedOrder.ingredients.reduce((acc: {[key: string]: number}, i) => {
        if (acc.hasOwnProperty(i)) {
          acc[i] += 1;
        } else {
          acc[i] = 1;
        }
        return acc;
      },{})).map(elem => {
        return {_id: elem[0], count: elem[1]};
      }) : [];

    let getInfoOfIngredients = getCountOfIngredients.map(ingredient => {
        return ingredients.filter(ingredientBurger => ingredientBurger._id === ingredient._id)
    }).flat();

    let concatCountAndInfoIngredients = getCountOfIngredients.map((ingredient, index) => ({...ingredient, ...getInfoOfIngredients[index]}))
    

    return (
        <section className={`${styles.wrp}`}>
            {wsConnected && selectedOrder
            ? 
            <>
                <p className="text text_type_digits-default mb-5">#{selectedOrder.number}</p>
                <p className="text text_type_main-medium mb-2">{selectedOrder.name}</p>
                {renderStatus(selectedOrder.status)}
                <p className="text text_type_main-medium mt-15 mb-4">Состав:</p>
                <div className={`${styles.order__list} mb-10`}>
                    {renderOrderList(concatCountAndInfoIngredients)}
                </div>
                <div className={styles.wrp__date_price}>
                    <p className="text text_type_main-default text_color_inactive">{moment(selectedOrder.createdAt).calendar()}</p>
                    {renderOrderSumList(concatCountAndInfoIngredients)}
                </div>
            </>
            : <p className="text text_type_main-medium">Загрузка данных...</p>}
        </section>
    )
}

export default FeedListItemDetails;