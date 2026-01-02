'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/auth/login');
        return;
      }

      setUser(user);
      setLoading(false);
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

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
                Home
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600 text-sm">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Available Content</h1>
          <p className="text-gray-600">Development Mode - Access all lessons and years</p>
        </div>

        {/* Year 7 Lessons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Year 7 - Unit 1</h2>
            <p className="text-gray-600">The Nature of Science</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Lesson 1 */}
            <Link
              href="/lesson/y7-u1-l01"
              className="bg-white border-2 border-gray-200 hover:border-blue-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">0% Complete</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">What is Science?</h3>
              <p className="text-sm text-gray-600 mb-4">Introduction to scientific thinking</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-2 bg-blue-500 rounded-full w-0"></div>
              </div>
            </Link>

            {/* Lesson 2 */}
            <Link
              href="/lesson/y7-u1-l02"
              className="bg-white border-2 border-gray-200 hover:border-teal-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-teal-600">2</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">0% Complete</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Observation vs Inference</h3>
              <p className="text-sm text-gray-600 mb-4">Learning to observe scientifically</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-2 bg-teal-500 rounded-full w-0"></div>
              </div>
            </Link>

            {/* Lesson 3 */}
            <Link
              href="/lesson/y7-u1-l03"
              className="bg-white border-2 border-gray-200 hover:border-purple-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">0% Complete</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Scientific Questions</h3>
              <p className="text-sm text-gray-600 mb-4">Asking testable questions</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-2 bg-purple-500 rounded-full w-0"></div>
              </div>
            </Link>

            {/* Lesson 4 */}
            <Link
              href="/lesson/y7-u1-l04"
              className="bg-white border-2 border-gray-200 hover:border-sky-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-sky-600">4</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">0% Complete</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Predictions and Variables</h3>
              <p className="text-sm text-gray-600 mb-4">Understanding scientific variables</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-2 bg-sky-500 rounded-full w-0"></div>
              </div>
            </Link>

            {/* Lesson 5 - Coming Soon */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 opacity-60 cursor-not-allowed">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-400">Locked</span>
              </div>
              <h3 className="text-lg font-bold text-gray-500 mb-2">Lesson 5</h3>
              <p className="text-sm text-gray-400 mb-4">Coming Soon</p>
              <div className="h-2 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Year 8 Lessons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Year 8 - Unit 1</h2>
            <p className="text-gray-600">Cells & Systems</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Year 8 Lesson 1 */}
            <Link
              href="/lesson/y8-u1-l01"
              className="bg-white border-2 border-gray-200 hover:border-emerald-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-emerald-600">1</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">0% Complete</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Cell Theory Breakthrough</h3>
              <p className="text-sm text-gray-600 mb-4">Discovery of cells and cell theory</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-2 bg-emerald-500 rounded-full w-0"></div>
              </div>
            </Link>

            {/* Year 8 Lesson 2 */}
            <Link
              href="/lesson/y8-u1-l02"
              className="bg-white border-2 border-gray-200 hover:border-cyan-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-cyan-600">2</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">0% Complete</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Organelle City</h3>
              <p className="text-sm text-gray-600 mb-4">Cell structure and organelle functions</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-2 bg-cyan-500 rounded-full w-0"></div>
              </div>
            </Link>

            {/* Year 8 Lesson 3 */}
            <Link
              href="/lesson/y8-u1-l03"
              className="bg-white border-2 border-gray-200 hover:border-lime-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-lime-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-lime-600">3</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">0% Complete</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Photosynthesis Factory</h3>
              <p className="text-sm text-gray-600 mb-4">How plants make food</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-2 bg-lime-500 rounded-full w-0"></div>
              </div>
            </Link>

            {/* Year 8 Lesson 4 */}
            <Link
              href="/lesson/y8-u1-l04"
              className="bg-white border-2 border-gray-200 hover:border-teal-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-teal-600">4</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">0% Complete</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Plant Gas Exchange</h3>
              <p className="text-sm text-gray-600 mb-4">Stomata & trade-offs</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-2 bg-teal-500 rounded-full w-0"></div>
              </div>
            </Link>

            {/* Year 8 Lesson 5 */}
            <Link
              href="/lesson/y8-u1-l05"
              className="bg-white border-2 border-gray-200 hover:border-rose-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-rose-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-rose-600">5</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">0% Complete</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Animal Transport Systems</h3>
              <p className="text-sm text-gray-600 mb-4">Circulatory systems</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-2 bg-rose-500 rounded-full w-0"></div>
              </div>
            </Link>
          </div>
        </div>

        {/* Year 9 Lessons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Year 9 - Unit 1</h2>
            <p className="text-gray-600">The Body at War (Disease) - Bio-Defense Agency 🧬</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Year 9 Lesson 1 */}
            <Link
              href="/lesson/y9-u1-l01"
              className="bg-white border-2 border-gray-200 hover:border-blue-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">0% Complete</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">The Balancing Act</h3>
              <p className="text-sm text-gray-600 mb-4">Homeostasis | Keeping conditions stable</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-2 bg-blue-500 rounded-full w-0"></div>
              </div>
            </Link>

            {/* Year 9 Lesson 2 */}
            <Link
              href="/lesson/y9-u1-l02"
              className="bg-white border-2 border-gray-200 hover:border-cyan-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-cyan-600">2</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">0% Complete</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">The Surveillance Network</h3>
              <p className="text-sm text-gray-600 mb-4">Receptors | Detecting changes</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-2 bg-cyan-500 rounded-full w-0"></div>
              </div>
            </Link>

            {/* Year 9 Lesson 3 */}
            <Link
              href="/lesson/y9-u1-l03"
              className="bg-white border-2 border-gray-200 hover:border-indigo-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-600">3</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">0% Complete</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Central Command</h3>
              <p className="text-sm text-gray-600 mb-4">Nervous System | Lightning-fast signals</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-2 bg-indigo-500 rounded-full w-0"></div>
              </div>
            </Link>

            {/* Year 9 Lesson 4 */}
            <Link
              href="/lesson/y9-u1-l04"
              className="bg-white border-2 border-gray-200 hover:border-purple-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">4</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">0% Complete</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Chemical Backup</h3>
              <p className="text-sm text-gray-600 mb-4">Endocrine System | Long-term control</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-2 bg-purple-500 rounded-full w-0"></div>
              </div>
            </Link>
          </div>
        </div>

        {/* Year 10 Lessons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Year 10</h2>
            <p className="text-gray-600">Content coming soon</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 opacity-60 cursor-not-allowed">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-400">Locked</span>
                </div>
                <h3 className="text-lg font-bold text-gray-500 mb-2">Unit {num}</h3>
                <p className="text-sm text-gray-400 mb-4">Coming Soon</p>
                <div className="h-2 bg-gray-200 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* HSC Subjects */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">HSC Sciences</h2>
            <p className="text-gray-600">Stage 6 content coming soon</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Biology */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 opacity-60 cursor-not-allowed">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-400">Locked</span>
              </div>
              <h3 className="text-lg font-bold text-gray-500 mb-2">Biology</h3>
              <p className="text-sm text-gray-400 mb-4">Preliminary & HSC</p>
              <div className="h-2 bg-gray-200 rounded-full"></div>
            </div>

            {/* Chemistry */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 opacity-60 cursor-not-allowed">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-400">Locked</span>
              </div>
              <h3 className="text-lg font-bold text-gray-500 mb-2">Chemistry</h3>
              <p className="text-sm text-gray-400 mb-4">Preliminary & HSC</p>
              <div className="h-2 bg-gray-200 rounded-full"></div>
            </div>

            {/* Physics */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 opacity-60 cursor-not-allowed">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-400">Locked</span>
              </div>
              <h3 className="text-lg font-bold text-gray-500 mb-2">Physics</h3>
              <p className="text-sm text-gray-400 mb-4">Preliminary & HSC</p>
              <div className="h-2 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
