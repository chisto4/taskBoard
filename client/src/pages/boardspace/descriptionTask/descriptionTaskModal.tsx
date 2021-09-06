import React, { useState } from 'react';

import styles from './descriptionTaskModal.module.scss';
import deleteTaskButton from '../../../icon/close.png';

const DescriptionTask = () => {

const [taskDescription, setTaskDescription] = useState('');
const [visionDescription, setVisionDescription] = useState(false);

return (
    <div className={styles.description_wrapper}>
      <h5>Change Task Name</h5>
      <form>
      <input className={styles.input_task_title}></input>
      </form>

      <h6>Description</h6>
      <form className={styles.description_form}>
      <textarea className={styles.input_description}></textarea>
      <button type="submit" className={styles.save_description_button}>SAVE</button>
      </form>

      <div className={styles.close_button_wrapper}>
        <a 
        onClick={() => setVisionDescription(false)}
        >
          <img src={deleteTaskButton} className={styles.close_description_button} alt='close'></img>
        </a>
      </div>

    </div>
)
}
export default DescriptionTask


