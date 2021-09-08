
import { useAppSelector } from '../../../store/reducers';
import styles from '../boardSpace.module.scss';
import ColumnItem from '../ColumnItem/ColumnItem';

const BoardItem = () => {

  const userColumnArray = useAppSelector((state) => state.board.column)

  return (
    <div className={styles.column_wrapper}>
      {userColumnArray.map(
        (column, index) => <ColumnItem key={column.id} column={column} columnIndex={index}
        />
        )
      }
    </div>
  )
}

export default BoardItem
