import React, { useState } from 'react';
import styles from '../styles/List.module.css';
import Card from './Card';

export default function List({ list, moveCard, addCard }) {
  const [input, setInput] = useState('');

  const onDrop = e => {
    e.preventDefault();
    const text = e.dataTransfer.getData('card');
    const srcId = Number(e.dataTransfer.getData('srcId'));
    if (text && srcId !== list.id) moveCard(srcId, text, list.id);
  };

  return (
    <div className={styles.column} onDragOver={e => e.preventDefault()} onDrop={onDrop}>
      <h3 className={styles.title}>{list.title}</h3>
      {list.cards.map((text, i) => (
        <Card key={i} text={text} srcListId={list.id} />
      ))}
      <div className={styles.addCard}>
        <input
          value={input}
          placeholder="New card..."
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={() => { addCard(list.id, input); setInput(''); }}>Add</button>
      </div>
    </div>
  );
}
