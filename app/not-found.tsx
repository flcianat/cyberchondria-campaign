import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdfbf7] text-center px-4">
      <h2 className="font-serif text-4xl mb-4">Not Found</h2>
      <p className="font-sans text-lg mb-8">Could not find requested resource</p>
      <Link 
        href="/"
        className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-slate-800 transition-all"
      >
        Return Home
      </Link>
    </div>
  )
}
