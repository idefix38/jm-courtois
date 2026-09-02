// Carré date (jour + mois abrégé), fond vert profond / texte blanc — utilisé par ActualiteCard et BlocActualiteBlock
const MOIS_ABREGES = ['JANV.', 'FÉVR.', 'MARS', 'AVR.', 'MAI', 'JUIN', 'JUIL.', 'AOÛT', 'SEPT.', 'OCT.', 'NOV.', 'DÉC.'];

export default function DateSquare({ date, className = 'w-16 h-16 md:w-20 md:h-20' }: { date: Date; className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center shrink-0 rounded ${className}`}
      style={{ backgroundColor: '#24333A', color: '#F6F6F2' }}
    >
      <span className="font-serif text-2xl md:text-3xl leading-none">{date.getDate()}</span>
      <span className="font-display text-[10px] md:text-xs uppercase tracking-widest mt-1">{MOIS_ABREGES[date.getMonth()]}</span>
    </div>
  );
}
