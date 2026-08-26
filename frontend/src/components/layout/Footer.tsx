export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="container mx-auto px-6 py-10 text-center text-sm">
        <p className="font-serif text-white text-lg mb-2">JM Courtois</p>
        <p>&copy; {new Date().getFullYear()} — Tous droits réservés</p>
      </div>
    </footer>
  );
}
