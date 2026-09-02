import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

// Désactive le Draft Mode et revient à l'accueil
export async function GET() {
    const draft = await draftMode();
    draft.disable();
    redirect('/');
}
