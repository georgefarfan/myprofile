"use client";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-neutral-800 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 dark:text-neutral-400">
        <p>© {new Date().getFullYear()} Jorge Farfan. All rights reserved.</p>
      </div>
    </footer>
  );
}
