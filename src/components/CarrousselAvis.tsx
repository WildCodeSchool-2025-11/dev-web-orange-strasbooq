import { useState, useEffect } from 'react';
import data from "../../public/data.json";

function CarrouselAvis() {
  const [indexActuel, setIndexActuel] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setIndexActuel((prevIndex) => {
        return prevIndex === 4 ? 0 : prevIndex + 1;
      });
    }, 7000);
    
    return () => clearInterval(timer);
  }, []);
  
  const avisActuel = data.avis[indexActuel];

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>{avisActuel.nom}</h3>
      <p>{avisActuel.commentaire}</p>
      <p>⭐ {avisActuel.note}/5</p>
      <small>{avisActuel.date}</small>
    </div>
  );
}

export default CarrouselAvis;