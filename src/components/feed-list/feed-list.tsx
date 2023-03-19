import styles from './feed-list.module.css';
import { useSelector} from '../../hooks';
import OrdersListItem from '../orders-list-item/orders-list-item';

type TFeedListProps = {
    width: string,
    withStatus: boolean,
}
const FeedList = ({width, withStatus} : TFeedListProps) => {
    const {wsConnected, messages} = useSelector(state => state.ws); 
    const renderFeedListItem = () => {
        if(wsConnected &&  messages[0]?.orders) {
            return messages[0].orders.map(order => {
                return <OrdersListItem withStatus={withStatus} order={order} key={order._id} isFeed={true}/>
            })
        }
    }

    return (
        <section style={{width: width}} className={styles.wrp}>
            {renderFeedListItem()}
        </section>
    );
}

export default FeedList;  