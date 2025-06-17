import React, { useState, useEffect } from 'react';
import styles from '../styles/Board.module.css';
import List from './List';

const initial = [
  { id: 1, title: 'To Do', cards: ['Task A', 'Task B'] },
  { id: 2, title: 'In Progress', cards: ['Task C'] },
  { id: 3, title: 'Done', cards: [] },
];

export default function Board() {
  const [lists, setLists] = useState(() => {
    const stored = localStorage.getItem('kanban');
    return stored ? JSON.parse(stored) : initial;
  });

  useEffect(() => {
    localStorage.setItem('kanban', JSON.stringify(lists));
  }, [lists]);

  const moveCard = (srcId, card, destId) => {
    setLists(prev =>
      prev.map(l => {
        if (l.id === srcId) return { ...l, cards: l.cards.filter(c => c !== card) };
        if (l.id === destId) return { ...l, cards: [...l.cards, card] };
        return l;
      })
    );
  };

  const addCard = (listId, text) => {
    if (!text.trim()) return;
    setLists(prev =>
      prev.map(l =>
        l.id === listId ? { ...l, cards: [...l.cards, text.trim()] } : l
      )
    );
  };

  return (
    <div className={styles.container}>
      {lists.map(list => (
        <List key={list.id} list={list} moveCard={moveCard} addCard={addCard} />
      ))}
    </div>
  );
}
