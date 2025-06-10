import React from 'react';

export default function DogDisplay({ dog, loading, error }) {
  return(
    <div> 
      {loading && (<p className="dog-container" style={{color: 'green'}}>Loading...</p>)}
      {error && (<p className="dog-container" style={{ color: 'red' }}> {error}</p>)}
      {dog && (<img src={dog} alt="A Random Dog"/>)}
    </div>
  )
}

