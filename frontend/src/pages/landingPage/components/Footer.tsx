export const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-white/10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Column 1: Brand */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-white text-xl font-bold mb-4 tracking-tighter">
            DEBRE <span className="text-blue-500">SELAM</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Connecting the faithful through digital innovation and spiritual
            peace.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                Lessons
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                Spiritual Songs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                Church Calendar
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Community */}
        <div>
          <h3 className="text-white font-semibold mb-4">Community</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                Donate
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© 2026 Debre Selam. Mount of Peace.</p>
        <p>Developed in Bahir Dar</p>
      </div>
    </footer>
  );
};
