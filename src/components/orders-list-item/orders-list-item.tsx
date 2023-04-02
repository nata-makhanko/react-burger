import styles from './orders-list-item.module.css';
import {TWsMessageOrders} from '../../utils/types';
import moment from 'moment';
import 'moment/locale/ru';
import { useSelector } from '../../hooks';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { renderStatus } from '../../utils/render-functions/render-functions';
import { Link, useLocation } from 'react-router-dom';

type TFeedListItemProps = {
    withStatus: boolean,
    order: TWsMessageOrders,
    isFeed: boolean,
}


const OrdersListItem = ({withStatus, order, isFeed}: TFeedListItemProps) => {

    const stylesForName = withStatus ? ' mb-2' : 'mb-6';
    const {createdAt, ingredients, name, number, status} = order;
    const {ingredients: ingredientsBurger} = useSelector(state => state.burgerIngredients);
    
    const location = useLocation();

    const getNewArrIngredients = () => {
        const objWithCount = ingredients.reduce((acc: {[key: string]: number}, i) => {
            if (acc.hasOwnProperty(i)) {
              acc[i] += 1;
            } else {
              acc[i] = 1;
            }
            return acc;
          },{});
          let arrWithCount = Object.entries(objWithCount).map(elem => {
            return {_id: elem[0], count: elem[1]};
          });

          let arrWithBurgerIngredients = arrWithCount.map(ingredient => {
            return ingredientsBurger.filter(ingredientBurger => {
                if(ingredientBurger._id === ingredient._id) {
                    return ingredientBurger;
                }
            })
          })

          let res = arrWithBurgerIngredients.flat();

          let third = arrWithCount.map((item, index) => ({...item, ...res[index]}));

          return third;
    }

    const renderIngredientImg = () => {
        let arr = getNewArrIngredients();
        return arr.map((ingredient, index, ingredients) => {
            if(ingredient) {
                const {name,_id, image_mobile} = ingredient;
                const zIndexImg = ingredients.length - index;
                let count = ingredients.length - 6;
                let isZero = ingredients.length === 6 ? false : true;
                if(index < 5) {
                    return (
                    <li className={styles.img__list_item} style={{zIndex: zIndexImg}} key={_id}>
                        <img className={styles.img} src={image_mobile} alt={name}/>
                    </li> 
                    )
                }else if (index === 5 ) {
                    return (
                        <li className={styles.img__list_item} style={{zIndex: zIndexImg}} key={_id}>
                        <img className={styles.img} src={image_mobile} alt={name}/>
                        {
                            isZero 
                            ? 
                            <>
                                <div className={styles.count__background}></div>
                                <p className={`${styles.count} text text_type_main-default`}>{`+${count}`}</p>
                            </> 
                            : null
                            
                        }
                        </li>
                    )
                }else {
                    return null;
                }
            }
            })
        }

        const renderSum = () => {
            let arr = getNewArrIngredients();
                return arr.reduce((acc: number, ingredient) => {
                    let sum = ingredient.count*ingredient.price;
                        return acc + sum;
                }, 0);

        }
    return (
        <>
            {isFeed 
            ? <Link to={{
                pathname: `/feed/${number}`,
                state: { background: location },
              }} 
              className={`${styles.wrp} pt-6 pr-6 pb-6 pl-6 mb-4`}>
                <div className={`${styles.info} mb-6`}>
                    <p className="text text_type_digits-default">{`#${number}`}</p>
                    <p className={`${styles.date} text text_type_main-default`}>{moment(createdAt).calendar()}</p>
                </div>
                <p className={`${styles.name} text text_type_main-medium ${stylesForName}`}>{name}</p>
                {withStatus ? renderStatus(status) : null}
                <div className={styles.wrp__img_sum}>
                    <ul className={`${styles.img__list}`}>
                        {renderIngredientImg()}
                    </ul>
                    <div className={styles.sum}>
                        <p className='text text_type_digits-default mr-2'>{renderSum()}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </Link>
            : <Link to={{
                pathname: `/profile/orders/${number}`,
                state: { background: location },
              }} 
              className={`${styles.wrp} pt-6 pr-6 pb-6 pl-6 mb-4`}>
                <div className={`${styles.info} mb-6`}>
                    <p className="text text_type_digits-default">{`#${number}`}</p>
                    <p className={`${styles.date} text text_type_main-default`}>{moment(createdAt).calendar()}</p>
                </div>
                <p className={`${styles.name} text text_type_main-medium ${stylesForName}`}>{name}</p>
                {withStatus ? renderStatus(status) : null}
                <div className={styles.wrp__img_sum}>
                    <ul className={`${styles.img__list}`}>
                        {renderIngredientImg()}
                    </ul>
                    <div className={styles.sum}>
                        <p className='text text_type_digits-default mr-2'>{renderSum()}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </Link> }
        </>
        
    )
}

export default OrdersListItem;