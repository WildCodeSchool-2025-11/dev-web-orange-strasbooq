import { useState, useEffect } from 'react';
import data from "../../public/data.json";

function CarrouselAvis() {
  const [indexActuel, setIndexActuel] = useState(0);
  
  // Défilement automatique toutes les 7 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setIndexActuel((prev) => {
        if (prev === data.avis.length - 1) {
          return 0; // Retour au début
        }
        return prev + 1; // Avis suivant
      });
    }, 7000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Fonction pour aller à l'avis précédent
  const precedent = () => {
    if (indexActuel === 0) {
      setIndexActuel(data.avis.length - 1); // Va au dernier
    } else {
      setIndexActuel(indexActuel - 1);
    }
  };
  
  // Fonction pour aller à l'avis suivant
  const suivant = () => {
    if (indexActuel === data.avis.length - 1) {
      setIndexActuel(0); // Retour au premier
    } else {
      setIndexActuel(indexActuel + 1);
    }
  };
  
  const avisActuel = data.avis[indexActuel];
  
  // Affichage des étoiles
  const afficherEtoiles = (note: number) => {
    const etoiles = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= note) {
        etoiles.push(<span key={i}>⭐</span>);
      } else {
        etoiles.push(<span key={i} className="opacity-30">⭐</span>);
      }
    }
    return etoiles;
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Carte de l'avis */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {avisActuel.nom.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{avisActuel.nom}</h3>
            <div className="text-yellow-500 text-sm flex">
              {afficherEtoiles(avisActuel.note)}
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 leading-relaxed">{avisActuel.commentaire}</p>
        <small className="text-gray-400">{avisActuel.date}</small>
      </div>

      {/* Boutons de navigation EN DESSOUS */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          type = "button"
          onClick={precedent}
          className="bg-green-900 hover:bg-green-700 text-white rounded-full p-2 shadow"
        >
          Précédent
        </button>
        
        {/* Points indicateurs */}
        <div className="flex gap-2">
          {data.avis.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setIndexActuel(index)}
              className={`w-3 h-3 rounded-full ${
                index === indexActuel ? 'bg-green-900' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <button
          type = "button"
          onClick={suivant}
          className="bg-green-900 hover:bg-green-700 text-white rounded-full p-2 shadow"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default CarrouselAvis;