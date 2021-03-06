import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function TodoActionHandlers({
  item,
  onComplete,
  onEdit,
  onRemove,
}) {
  const [isShown, setIsShown] = useState(false);
  const onMouseHoverEvent = (isHover) => {
    setIsShown(isHover);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <ul
      onMouseEnter={() => onMouseHoverEvent(true)}
      onMouseLeave={() => onMouseHoverEvent(false)}
    >
      <li key={item.todo.toString()} className={styles.textInline}>
        <span
          className={
            item.isCompleted ? styles.text_strike : styles.text_none_strike
          }
        >
          <span onClick={() => onComplete(item)}>
            . {item.todo} {formatDate(item.createAt)}
          </span>
        </span>
        <span>
          {isShown && (
            <div>
              <button className={styles.button} onClick={() => onEdit(item)}>
                Edit
              </button>
              <button className={styles.button} onClick={() => onRemove(item)}>
                Remove
              </button>
              <button
                className={styles.button}
                onClick={() => onComplete(item)}
              >
                {item.isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
              </button>
            </div>
          )}
        </span>
      </li>
    </ul>
  );
}
