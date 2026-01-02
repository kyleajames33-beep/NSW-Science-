'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export default function TeacherDashboard() {
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
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Teacher</span>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Teacher Resources</h1>
          <p className="text-gray-600">All lessons in presentation mode - perfect for classroom teaching</p>
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
              href="/teach/y7-u1-l01"
              className="bg-white border-2 border-gray-200 hover:border-blue-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">What is Science?</h3>
              <p className="text-sm text-gray-600 mb-4">Introduction to scientific thinking</p>
            </Link>

            {/* Lesson 2 */}
            <Link
              href="/teach/y7-u1-l02"
              className="bg-white border-2 border-gray-200 hover:border-teal-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-teal-600">2</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Observation vs Inference</h3>
              <p className="text-sm text-gray-600 mb-4">Learning to observe scientifically</p>
            </Link>

            {/* Lesson 3 */}
            <Link
              href="/teach/y7-u1-l03"
              className="bg-white border-2 border-gray-200 hover:border-purple-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Scientific Questions</h3>
              <p className="text-sm text-gray-600 mb-4">Asking testable questions</p>
            </Link>

            {/* Lesson 4 */}
            <Link
              href="/teach/y7-u1-l04"
              className="bg-white border-2 border-gray-200 hover:border-sky-400 rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-sky-600">4</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Predictions and Variables</h3>
              <p className="text-sm text-gray-600 mb-4">Understanding scientific variables</p>
            </Link>

            {/* Lesson 5 - Coming Soon */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 opacity-60 cursor-not-allowed">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-500 mb-2">Lesson 5</h3>
              <p className="text-sm text-gray-400 mb-4">Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Year 8 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Year 8</h2>
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
                </div>
                <h3 className="text-lg font-bold text-gray-500 mb-2">Unit {num}</h3>
                <p className="text-sm text-gray-400 mb-4">Coming Soon</p>
              </div>
            ))}
          </div>
        </div>

        {/* Year 9 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Year 9</h2>
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
                </div>
                <h3 className="text-lg font-bold text-gray-500 mb-2">Unit {num}</h3>
                <p className="text-sm text-gray-400 mb-4">Coming Soon</p>
              </div>
            ))}
          </div>
        </div>

        {/* Year 10 */}
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
                </div>
                <h3 className="text-lg font-bold text-gray-500 mb-2">Unit {num}</h3>
                <p className="text-sm text-gray-400 mb-4">Coming Soon</p>
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
              </div>
              <h3 className="text-lg font-bold text-gray-500 mb-2">Biology</h3>
              <p className="text-sm text-gray-400 mb-4">Preliminary & HSC</p>
            </div>

            {/* Chemistry */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 opacity-60 cursor-not-allowed">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-500 mb-2">Chemistry</h3>
              <p className="text-sm text-gray-400 mb-4">Preliminary & HSC</p>
            </div>

            {/* Physics */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 opacity-60 cursor-not-allowed">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-500 mb-2">Physics</h3>
              <p className="text-sm text-gray-400 mb-4">Preliminary & HSC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
