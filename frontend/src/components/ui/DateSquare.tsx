// Carré date (jour + mois abrégé), fond vert profond / texte blanc — utilisé par ActualiteCard et BlocActualiteBlock
const MOIS_ABREGES = ['JANV.', 'FÉVR.', 'MARS', 'AVR.', 'MAI', 'JUIN', 'JUIL.', 'AOÛT', 'SEPT.', 'OCT.', 'NOV.', 'DÉC.'];

export default function DateSquare({
  date,
  dateFin,
  className = 'w-16 h-16 md:w-20 md:h-20',
}: {
  date: Date;
  dateFin?: Date | null;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center shrink-0 rounded ${className}`}
      style={{ backgroundColor: '#24333A', color: '#F6F6F2' }}
    >
      {renderContent(date, dateFin)}
    </div>
  );
}

function renderContent(date: Date, dateFin?: Date | null) {
  // Pas de date de fin (ou identique à la date de début) : affichage inchangé
  if (!dateFin || dateFin.getTime() === date.getTime()) {
    return (
      <>
        <span className="font-serif text-2xl md:text-3xl leading-none">{date.getDate()}</span>
        <span className="font-display text-[10px] md:text-xs uppercase tracking-widest mt-1">{MOIS_ABREGES[date.getMonth()]}</span>
      </>
    );
  }

  const sameMonth = date.getMonth() === dateFin.getMonth() && date.getFullYear() === dateFin.getFullYear();

  if (sameMonth) {
    // Jours consécutifs (écart d'un jour maximum) : "4,5", sinon plage "9 au 12" (le "au" en plus petit)
    const consecutifs = dateFin.getDate() - date.getDate() <= 1;
    return (
      <>
        <span className="font-serif text-lg md:text-2xl leading-none">
          {consecutifs ? (
            `${date.getDate()},${dateFin.getDate()}`
          ) : (
            <>
              {date.getDate()} <span className="text-xs md:text-sm">au</span> {dateFin.getDate()}
            </>
          )}
        </span>
        <span className="font-display text-[10px] md:text-xs uppercase tracking-widest mt-1">{MOIS_ABREGES[date.getMonth()]}</span>
      </>
    );
  }

  // Mois différents : jour + mois sur chaque ligne, séparés par "au" en plus petit
  return (
    <>
      <span className="font-display text-[9px] md:text-[11px] uppercase tracking-wide leading-tight text-center">
        {date.getDate()} {MOIS_ABREGES[date.getMonth()]}
      </span>
      <span className="font-display text-[7px] md:text-[8px] uppercase tracking-wide leading-tight text-center">au</span>
      <span className="font-display text-[9px] md:text-[11px] uppercase tracking-wide leading-tight text-center">
        {dateFin.getDate()} {MOIS_ABREGES[dateFin.getMonth()]}
      </span>
    </>
  );
}
