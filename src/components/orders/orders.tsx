import styles from './orders.module.css';
import { useEffect } from 'react';
import {WS_CONNECTION_START, WS_CONNECTION_CLOSED} from '../../services/actions/ws-action-types';
import { useDispatch, useSelector } from '../../hooks';
import { _apiWs } from '../../services/api';
import { getCookie } from '../../utils/cookies';
import OrdersListItem from '../orders-list-item/orders-list-item';

const Orders = () => {
    let accessToken = getCookie('token');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
          type: WS_CONNECTION_START,
          payload: `${_apiWs}?token=${accessToken}`,
        })
        return () => {
          dispatch({
            type: WS_CONNECTION_CLOSED
          });
        }
      }, [dispatch, accessToken]);
    const {wsConnected, messages} = useSelector(state => state.ws); 
    const renderOrdersListItem = () => {
        if(wsConnected &&  messages[0]?.orders) {
            const reversedArr = [...messages[0].orders].reverse();
            return reversedArr.map(order => {
                return <OrdersListItem withStatus={true} order={order} key={order._id} isFeed={false}/>
            })
        }
    }

    
    return (
    <>
        {
            wsConnected ? 
                <section style={{width: '150%'}} className={styles.wrp}>
                    {renderOrdersListItem()}
                </section>
            
            : <p className="text text_type_main-medium">Загрузка данных...</p>
        }

    </>)
};

export default Orders;
