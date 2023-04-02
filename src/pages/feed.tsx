import styles from './feed.module.css';
import { useEffect } from 'react';
import {WS_CONNECTION_START, WS_CONNECTION_CLOSED} from '../services/actions/ws-action-types';
import { useDispatch, useSelector } from '../hooks';
import FeedList from '../components/feed-list/feed-list';
import FeedInfo from '../components/feed-info/feed-info';
import { _apiWs } from '../services/api';

const Feed = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
          type: WS_CONNECTION_START,
          payload: `${_apiWs}/all`,
        })
        return () => {
          dispatch({
            type: WS_CONNECTION_CLOSED
          });
        }
      }, [dispatch]);

      const {wsConnected} = useSelector(state => state.ws)
    
    return (
      <section className={`${styles.wrp} pt-10`}>
        {wsConnected 
        ? 
        <>
            <p className={`${styles.title} text text_type_main-large pb-5`}>Лента заказов</p>
            <div className={styles.wrp__all_content}>
                <FeedList width='45%' withStatus={false}/>
                <FeedInfo width='45%'/>
            </div>

        </>

        : <p className="text text_type_main-medium">Загрузка данных ленты...</p>
        }

      </section>
    )
    
}

export default Feed;