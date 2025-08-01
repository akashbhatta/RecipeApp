import { Link } from 'react-router-dom';

export default function Footer() {
  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Drinks'];

  return (
    <section id="footer" className="footer">
      <footer className="bg-gray-900 text-white p-10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Recipe Finder</h2>
            <p className="text-sm text-gray-200">
              Your trusted platform for discovering amazing recipes from around the world.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-2 ">Categories</h3>
            <ul className="space-y-1 text-sm">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/category/${cat.toLowerCase()}`}
                    className="cursor-pointer hover:text-green-400 hover:underline transition-colors"

                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Team Members */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Team</h3>
            <ul className="space-y-1 text-sm text-gray-200">
              <li>Samridhi Sapkota</li>
              <li>Nirmita Pandit</li>
               <li>Krisha Dheke</li>
                <li>Hikmat Malla</li>
            <li>Akash Bhatta</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <ul className="space-y-1 text-sm text-gray-200">
              <li>Email: akashbhatta100@gmail.com</li>
              <li>Phone: +977 9778796524</li>
            </ul>
          </div>
        </div>

        <p className="text-center text-xs text-gray-200 mt-10">
          © 2025 Recipe Finder. All rights reserved.
        </p>
      </footer>
    </section>
  );
}
