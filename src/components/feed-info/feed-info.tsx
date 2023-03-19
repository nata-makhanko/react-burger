import { useSelector } from "../../hooks";
import styles from './feed-info.module.css';

type TFeedInfo = {
    width: string,
}

const FeedInfo = ({width} : TFeedInfo) => {
    const {messages} = useSelector(state => state.ws);
    const renderStatus = (status: string) => {
        if(messages[0]?.orders) {
            const ordersStatusDone = messages[0].orders.filter(order => order.status === 'done');
            const ordersStatusPending = messages[0].orders.filter(order => order.status === 'pending');
            switch (status) {
                case 'done': {
                    return ordersStatusDone.map(order => {
                        return (
                            <p className={`${styles.done__txt} text text_type_digits-default mb-2`} key={order._id}>{order.number}</p>
                        )
                    })
                }
                case 'pending': {
                    return ordersStatusPending.map(order => {
                        return (
                            <p className={`text text_type_digits-default mb-2`} key={order._id}>{order.number}</p>
                        )
                    })
                }
                default: {
                    return null;
                }
            }
        }
       
    }
    const renderTotal = () => {
        if(messages[0]?.total) {
            return messages[0]?.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        } else {
           return null;
        }
    }
    return (
        <section style={{width: width}} className={styles.wrp}>
            <div className={`${styles.wrp__statuses} mb-15`}>
                <div className={styles.wrp__done}>
                    <p className="text text_type_main-medium pb-6">Готовы:</p>
                    <div className={styles.done}>
                        {renderStatus('done')}
                    </div>
                </div>
                <div className={styles.wrp__pending}>
                    <p className="text text_type_main-medium pb-6">В работе:</p>
                    <div className={styles.pending}>
                        {renderStatus('pending')}
                    </div>
                </div>
            </div>
            <div className="mb-15">
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className={`${styles.number} text text_type_digits-large`}>{renderTotal()}</p>
            </div>
            <div>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className={`${styles.number} text text_type_digits-large`}>{messages[0]?.totalToday}</p>
            </div>
        </section>
    )
}

export default FeedInfo;