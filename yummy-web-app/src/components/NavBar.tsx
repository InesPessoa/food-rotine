import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="flex justify-center gap-8 py-4 bg-white shadow">
      <Link href="/">
        <span className="font-semibold text-lg hover:text-blue-500 cursor-pointer">Grocery List</span>
      </Link>
      <Link href="/meal-planner">
        <span className="font-semibold text-lg hover:text-blue-500 cursor-pointer">Meal Planner</span>
      </Link>
    </nav>
  );
} 