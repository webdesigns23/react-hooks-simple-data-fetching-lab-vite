import React from 'react';

export default function FetchButton({ fetchDog }) {
  return (
    <button className="fetch-button" onClick={fetchDog}>
      Display Dog
    </button>
  );
}

