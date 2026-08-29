// Rendu uniforme des champs de texte riche (CKEditor) : paragraphes, et séparateurs <hr> stylisés en trait beige
export default function RichText({ html, className = '' }: { html: string; className?: string }) {
  return (
    <div
      className={`prose prose-sm max-w-none text-anthracite prose-p:leading-snug [&_hr]:h-px [&_hr]:w-[70px] [&_hr]:border-0 [&_hr]:bg-[#C8B99A] [&_hr]:mt-[15px] [&_hr]:mb-[15px] [&_hr]:ml-0 [&_hr]:mr-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
