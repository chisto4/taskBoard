
import { useAppSelector } from '../../../store/reducers';
import styles from '../boardSpace.module.scss';
import ColumnItem from '../ColumnItem/ColumnItem';

const BoarвItem = () => {

  const userColumnArray = useAppSelector((state) => state.board.column)

  return (
    <div className={styles.column_wrapper}>
      {userColumnArray.map(
        (column => <ColumnItem column={column} />)
      )}
    </div>
  )
}

export default BoarвItem
