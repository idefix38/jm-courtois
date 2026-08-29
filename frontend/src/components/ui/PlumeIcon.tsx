import { readFileSync } from 'fs';
import { join } from 'path';

const plumeSvg = readFileSync(join(process.cwd(), 'public/images/plume.svg'), 'utf-8');

// Icône plume intégrée en inline SVG (currentColor) pour hériter de la couleur du texte parent
export default function PlumeIcon({ className = 'w-[60px] h-[60px]' }: { className?: string }) {
  return (
    <span
      className={`inline-block shrink-0 [&>svg]:w-full [&>svg]:h-full ${className}`}
      dangerouslySetInnerHTML={{ __html: plumeSvg }}
      aria-hidden="true"
    />
  );
}
