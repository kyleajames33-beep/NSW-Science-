'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Year9Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-2xl font-bold">
                <span className="text-blue-600">NSW</span>{' '}
                <span className="text-purple-600">Science Hub</span>
              </Link>
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Year 9 Science</h1>
          <p className="text-xl text-gray-600">Stage 5 - Explore Disease, Materials, Energy, and Motion</p>
        </div>

        {/* Unit 1: Disease */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">🧬</span>
              <h2 className="text-3xl font-bold text-gray-900">Unit 1: The Body at War</h2>
            </div>
            <p className="text-lg text-gray-600 mb-2">Bio-Defense Agency Theme</p>
            <p className="text-gray-500">Explore homeostasis, coordination systems, and immune defenses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Lesson 1 */}
            <Link
              href="/lesson/y9-u1-l01"
              className="bg-white border-2 border-gray-200 hover:border-blue-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">500 XP</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">The Balancing Act</h3>
              <p className="text-sm text-gray-600 mb-4">Homeostasis | Keeping conditions stable</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>⏱️ 20-25 min</span>
              </div>
            </Link>

            {/* Lesson 2 */}
            <Link
              href="/lesson/y9-u1-l02"
              className="bg-white border-2 border-gray-200 hover:border-cyan-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-cyan-600">2</span>
                </div>
                <span className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs font-semibold rounded">500 XP</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">The Surveillance Network</h3>
              <p className="text-sm text-gray-600 mb-4">Receptors | Detecting changes</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>⏱️ 20-25 min</span>
              </div>
            </Link>

            {/* Lesson 3 */}
            <Link
              href="/lesson/y9-u1-l03"
              className="bg-white border-2 border-gray-200 hover:border-indigo-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-600">3</span>
                </div>
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded">500 XP</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Central Command</h3>
              <p className="text-sm text-gray-600 mb-4">Nervous System | Lightning-fast signals</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>⏱️ 20-25 min</span>
              </div>
            </Link>

            {/* Lesson 4 */}
            <Link
              href="/lesson/y9-u1-l04"
              className="bg-white border-2 border-gray-200 hover:border-purple-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">4</span>
                </div>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">500 XP</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Chemical Backup</h3>
              <p className="text-sm text-gray-600 mb-4">Endocrine System | Long-term control</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>⏱️ 20-25 min</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Units 2-4 Coming Soon */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Unit 2 */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🧪</span>
              <h3 className="text-xl font-bold text-gray-500">Unit 2: Materials</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">Matter Architects - Coming Soon</p>
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 rounded-full"></div>
              <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
            </div>
          </div>

          {/* Unit 3 */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">⚡</span>
              <h3 className="text-xl font-bold text-gray-500">Unit 3: Energy</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">Grid Zero Architects - Coming Soon</p>
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 rounded-full"></div>
              <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
            </div>
          </div>

          {/* Unit 4 */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🎬</span>
              <h3 className="text-xl font-bold text-gray-500">Unit 4: Waves & Motion</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">The Stunt Lab - Coming Soon</p>
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 rounded-full"></div>
              <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
