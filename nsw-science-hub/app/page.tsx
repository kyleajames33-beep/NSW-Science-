import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                <span className="text-blue-600">NSW</span>{' '}
                <span className="text-purple-600">Science Hub</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#about" className="text-gray-600 hover:text-gray-900 font-medium">
                About Us
              </Link>
              <Link href="#curriculum" className="text-gray-600 hover:text-gray-900 font-medium">
                NSW Curriculum
              </Link>
              <Link href="#topics" className="text-gray-600 hover:text-gray-900 font-medium">
                Topic Tests
              </Link>
              <Link href="#materials" className="text-gray-600 hover:text-gray-900 font-medium">
                Study Materials
              </Link>
              <Link href="#videos" className="text-gray-600 hover:text-gray-900 font-medium">
                Suggested Videos
              </Link>
              <Link href="#practicals" className="text-gray-600 hover:text-gray-900 font-medium">
                Suggested Practicals
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to The NSW Science Hub
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Your comprehensive, interactive learning resource for NSW Science students from Years 7 through 12.
            Whether you're just beginning your science journey in Stage 4 or preparing for your HSC in Stage 6, we've got you covered.
          </p>
        </div>

        {/* What You'll Find Here Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What You'll Find Here
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Lessons</h3>
              <p className="text-gray-600 leading-relaxed">
                Detailed lesson content aligned with the NESA syllabus, covering all required topics and concepts.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Interactive Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Engage with practice questions, worked examples, and interactive activities to reinforce your understanding.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Exam Preparation</h3>
              <p className="text-gray-600 leading-relaxed">
                Practice questions and revision materials to help you prepare for tests and examinations.
              </p>
            </div>
          </div>
        </div>

        {/* Year Selection Section */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left - Year Selection */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Year</h2>
              <div className="space-y-3">
                <Link
                  href="/year-7"
                  className="block px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-900 transition-colors"
                >
                  Year 7
                </Link>
                <Link
                  href="/year-8"
                  className="block px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-900 transition-colors"
                >
                  Year 8
                </Link>
                <Link
                  href="/year-9"
                  className="block px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-900 transition-colors"
                >
                  Year 9
                </Link>
                <Link
                  href="/year-10"
                  className="block px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-900 transition-colors"
                >
                  Year 10
                </Link>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">HSC</h3>
                <div className="space-y-3">
                  <Link
                    href="/dashboard/student"
                    className="block px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-900 transition-colors"
                  >
                    Biology
                  </Link>
                  <Link
                    href="/dashboard/student"
                    className="block px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-900 transition-colors"
                  >
                    Chemistry
                  </Link>
                  <Link
                    href="/dashboard/student"
                    className="block px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-900 transition-colors"
                  >
                    Physics
                  </Link>
                </div>
              </div>
            </div>

            {/* Right - Real-World Applications */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-World Applications</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Discover how scientific concepts apply to everyday life and current global challenges.
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Environmental Science</h4>
                  <p className="text-sm text-gray-600">Understanding climate change and sustainability</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Medical Applications</h4>
                  <p className="text-sm text-gray-600">From vaccines to genetic engineering</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Technology Innovation</h4>
                  <p className="text-sm text-gray-600">Physics and chemistry in modern devices</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 py-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Learning?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of NSW students mastering science concepts through our comprehensive platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Get Started Free
            </Link>
            <Link
              href="/auth/login"
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p>&copy; 2026 NSW Science Hub. All rights reserved.</p>
            <p className="mt-2">Aligned with the NSW Education Standards Authority (NESA) curriculum.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
