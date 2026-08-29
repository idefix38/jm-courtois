import Image from 'next/image';

// Trait — branche de laurier — trait, utilisé pour séparer un titre de son contenu
export default function LaurierSeparator() {
  return (
    <div className="flex items-center justify-center gap-4" aria-hidden="true">
      <span className="h-px w-16 bg-[#C8B99A]" />
      <Image src="/images/laurier.webp" alt="" width={28} height={28} />
      <span className="h-px w-16 bg-[#C8B99A]" />
    </div>
  );
}
