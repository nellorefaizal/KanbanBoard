import React from 'react';
import styles from '../styles/Card.module.css';

export default function Card({ text, srcListId }) {
  const onDragStart = e => {
    e.dataTransfer.setData('card', text);
    e.dataTransfer.setData('srcId', srcListId);
  };

  return (
    <div draggable onDragStart={onDragStart} className={styles.card}>
      <span className={styles.text}>{text}</span>
    </div>
  );
}
