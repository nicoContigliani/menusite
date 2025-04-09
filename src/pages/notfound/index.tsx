'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-6xl font-bold">404</h1>
      <span className="text-xl mt-4">Página no encontrada</span>
      <Link href="/">
        <a className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Volver al inicio
        </a>
      </Link>
    </div>
  );
}