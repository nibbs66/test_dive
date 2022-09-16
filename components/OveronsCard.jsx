import React from 'react';

const OveronsCard = () => {
    return (
        <div className={` px-10`}>
           <div className={`flex flex-col items-center gap-1 mb-5`}>
               <span className={`text-4xl text-slate-500 tracking-wider font-thin`}>Welkom bij RnG Diving de duikschool uit Breda</span>
               <span className={` text-slate-500 `}>WE ONTMOETEN JULLIE GRAAG, GEVEN JE EEN OPLEIDING EN NEMEN JE MEE OM LEUKE ACTIVITEITEN TE DOEN!</span>
           </div>
            <div className={`flex flex-col items-start gap-2 text-slate-400 `}>
                <p className={`text-lg`}>Tof dat je ons hier Hebt gevonden!</p>
                <p  className={`text-lg font-bold`}>We zijn een trots PADI 5 * IDC-centrum, wat betekent dat we gedijen op kwaliteit, veiligheid en natuurlijk veel plezier!</p>
                <p className={`text-sm`}>Met contacten over heel de wereld, o.a. Curacao, Balie, Egypte, Spanje en nog veel meer plekken,
                    garanderen we je het bestw wat duiken te bieden heeft. Met meer als 20 jaar ervaring, geven we
                    volgens de laatste standaarden les, we leveren kwaliteit, veiligheid en alle diensten die nodig
                    zijn om en bij het duiken.</p>
                <p className={`text-sm`}>Al onze apparatuur wordt om de 2 jaar vernieuwd om u comfort en veiligheid te garanderen. Begin dus
                    vandaag met je PADI Adventure, duik en verander je leven. Ons team is er om u stap voor stap bij te
                    staan.</p>
                <p className={`text-sm font-bold`}>Waar wacht je op?</p>
            </div>

        </div>
    );
};

export default OveronsCard;
