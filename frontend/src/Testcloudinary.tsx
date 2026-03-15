// Testcloudinary.tsx
import {
  Award,
  BarChart3,
  Bed,
  Bell,
  Building,
  Calendar,
  Car,
  Check,
  Clock,
  Coffee,
  DollarSign,
  Download,
  Edit2,
  Eye,
  FileText,
  Filter,
  HelpCircle,
  Home,
  Hotel,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  Star,
  Trash2,
  TrendingUp,
  Tv,
  User,
  Users,
  Wifi,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";

const Testcloudinary: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<
    "login" | "dashboard" | "booking" | "roomManagement" | "admin" | "reports"
  >("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkIn, setCheckIn] = useState("2026-01-05");
  const [checkOut, setCheckOut] = useState("2026-01-08");
  const [guests, setGuests] = useState("2");
  const [roomType, setRoomType] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState<string | null>("205");
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("guests");
  const [reportType, setReportType] = useState("revenue");
  const [dateRange, setDateRange] = useState("last-month");

  // Mock data
  const upcomingStays = [
    {
      id: 1,
      roomNumber: "205",
      roomType: "Deluxe Room",
      checkIn: "2026-01-05",
      checkOut: "2026-01-08",
      floor: "Floor 2",
      status: "Confirmed",
      price: 360,
    },
  ];

  const rooms = [
    {
      id: "205",
      type: "Deluxe Room",
      description: "Queen Bed, AC, Sea View",
      maxGuests: 2,
      checkInTime: "3:00 PM",
      price: 120,
      amenities: [
        <Wifi key="wifi" />,
        <Tv key="tv" />,
        <Coffee key="coffee" />,
      ],
      available: true,
    },
    {
      id: "301",
      type: "Suite",
      description: "King Bed, Living Area, Balcony",
      maxGuests: 3,
      checkInTime: "3:00 PM",
      price: 180,
      amenities: [
        <Wifi key="wifi" />,
        <Tv key="tv" />,
        <Coffee key="coffee" />,
        <Car key="car" />,
      ],
      available: true,
    },
  ];

  const roomStatusData = [
    {
      id: "205",
      type: "Deluxe",
      floor: "Floor 2",
      status: "Occupied",
      details: "Check-out: Jan 8",
      cleaning: "Today 10:00 AM",
      lastCleanedBy: "John Doe",
    },
    {
      id: "301",
      type: "Suite",
      floor: "Floor 3",
      status: "Available",
      details: "Ready for check-in",
      cleaning: "Yesterday 14:30",
      lastCleanedBy: "Jane Smith",
    },
  ];

  const guestsData = [
    {
      id: "001",
      name: "Alice Johnson",
      email: "alicej@example.com",
      phone: "+1 (555) 123-4567",
      status: "Active",
      since: "Jan 1, 2026",
      lastActivity: "2 hours ago",
      action: "Booked stay #1133",
    },
  ];

  const revenueData = [
    2000, 1800, 2400, 1950, 2500, 2800, 3200, 2950, 3800, 3500, 4200, 4500,
  ];
  const roomTypes = [
    {
      type: "Deluxe Suite",
      bookings: 245,
      revenue: 15150,
      occupancy: 92,
      rating: 4.8,
    },
  ];

  // Navigation items for each page
  const getNavItems = (page: string) => {
    const baseItems = [
      { icon: <Home size={20} />, label: "Home", active: page === "dashboard" },
      {
        icon: <Calendar size={20} />,
        label: "Book Room",
        active: page === "booking",
      },
      {
        icon: <Building size={20} />,
        label: "Room Management",
        active: page === "roomManagement",
      },
      {
        icon: <Users size={20} />,
        label: "Admin Panel",
        active: page === "admin",
      },
      {
        icon: <BarChart3 size={20} />,
        label: "Analytics & Reports",
        active: page === "reports",
      },
    ];

    if (page === "dashboard") {
      return baseItems.map((item) => ({
        ...item,
        active: item.label === "Home",
      }));
    }
    if (page === "booking") {
      return baseItems.map((item) => ({
        ...item,
        active: item.label === "Book Room",
      }));
    }
    if (page === "roomManagement") {
      return baseItems.map((item) => ({
        ...item,
        active: item.label === "Room Management",
      }));
    }
    if (page === "admin") {
      return baseItems.map((item) => ({
        ...item,
        active: item.label === "Admin Panel",
      }));
    }
    if (page === "reports") {
      return baseItems.map((item) => ({
        ...item,
        active: item.label === "Analytics & Reports",
      }));
    }
    return baseItems;
  };

  // Render Login Page
  const renderLogin = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 border border-gray-700">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Hotel size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Hotel Management System
          </h1>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentPage("dashboard");
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username or Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-600 rounded bg-gray-700"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300"
          >
            Sign In
          </button>

          <div className="text-center">
            <span className="text-gray-400 text-sm">
              Don't have an account?{" "}
            </span>
            <a
              href="#"
              className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
            >
              Create Account
            </a>
          </div>
        </form>

        <div className="mt-10 pt-6 border-t border-gray-700">
          <p className="text-center text-gray-500 text-sm">
            © 2026 Hotel Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );

  // Render Header Component
  const renderHeader = (title: string, subtitle?: string) => (
    <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-64"
              />
            </div>

            <button className="relative p-2 text-gray-400 hover:text-white">
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <User size={18} />
              </div>
              <div className="text-left hidden md:block">
                <div className="text-sm font-medium text-white">John Smith</div>
                <div className="text-xs text-gray-400">Guest</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  // Render Sidebar Component
  const renderSidebar = (
    items: Array<{ icon: React.ReactNode; label: string; active?: boolean }>
  ) => (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Hotel size={24} />
          </div>
          <div>
            <div className="font-bold text-white">HOTEL HMS</div>
            <div className="text-xs text-gray-400">Management System</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  if (item.label === "Home") setCurrentPage("dashboard");
                  if (item.label === "Book Room") setCurrentPage("booking");
                  if (item.label === "Room Management")
                    setCurrentPage("roomManagement");
                  if (item.label === "Admin Panel") setCurrentPage("admin");
                  if (item.label === "Analytics & Reports")
                    setCurrentPage("reports");
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                  item.active
                    ? "bg-gradient-to-r from-cyan-900/30 to-blue-900/30 text-cyan-300 border border-cyan-800/30"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="px-4 py-3 bg-gray-800 rounded-lg">
          <div className="text-sm text-white">Premium Plan</div>
          <div className="text-xs text-gray-400 mt-1">
            Upgrade for more features
          </div>
        </div>
      </div>
    </aside>
  );

  // Render Guest Dashboard
  const renderDashboard = () => (
    <div className="flex min-h-screen bg-gray-900">
      {renderSidebar(getNavItems("dashboard"))}

      <div className="flex-1">
        {renderHeader(
          "Welcome back, John Smith!",
          "Manage your hotel stays and bookings"
        )}

        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Upcoming Stays</p>
                  <p className="text-2xl font-bold text-white mt-2">2</p>
                </div>
                <Calendar className="text-blue-400" size={24} />
              </div>
              <p className="text-green-400 text-sm mt-2">+1 this month</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Spent</p>
                  <p className="text-2xl font-bold text-white mt-2">$2,450</p>
                </div>
                <DollarSign className="text-green-400" size={24} />
              </div>
              <p className="text-green-400 text-sm mt-2">
                +15% from last month
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Loyalty Points</p>
                  <p className="text-2xl font-bold text-white mt-2">1,250</p>
                </div>
                <Award className="text-purple-400" size={24} />
              </div>
              <p className="text-blue-400 text-sm mt-2">Gold Tier</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Average Rating</p>
                  <p className="text-2xl font-bold text-white mt-2">4.8</p>
                </div>
                <Star className="text-yellow-400" size={24} />
              </div>
              <p className="text-green-400 text-sm mt-2">+0.2 this year</p>
            </div>
          </div>

          {/* Upcoming Stays Section */}
          <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Upcoming Stays</h2>
              <button
                onClick={() => setCurrentPage("booking")}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
              >
                <Calendar size={20} />
                Book New Room
              </button>
            </div>

            <div className="space-y-4">
              {upcomingStays.map((stay) => (
                <div
                  key={stay.id}
                  className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {stay.roomType} #{stay.roomNumber}
                      </h3>
                      <p className="text-gray-400 mt-1">
                        {stay.checkIn} - {stay.checkOut} • Check-in: 3:00 PM
                      </p>
                      <p className="text-gray-300 mt-2">{stay.floor}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="px-4 py-2 bg-blue-900/30 text-blue-400 rounded-lg hover:bg-blue-900/50 transition-colors flex items-center gap-2">
                        <MapPin size={16} />
                        Early Check-in
                      </button>
                      <button className="px-4 py-2 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50 transition-colors flex items-center gap-2">
                        <XCircle size={16} />
                        Cancel Stay
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  // Render Booking Page
  const renderBooking = () => (
    <div className="flex min-h-screen bg-gray-900">
      {renderSidebar(getNavItems("booking"))}

      <div className="flex-1">
        {renderHeader("Book Room", "Find and book your perfect room")}

        <main className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Search Filters
              </h2>
              <p className="text-gray-400">Select your preferences</p>
            </div>
            <button className="p-2 text-gray-400 hover:text-white">
              <HelpCircle size={24} />
            </button>
          </div>

          {/* Search Form */}
          <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Check-in
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Check-out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Guests
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    min="1"
                    max="4"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                  <Users
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Room Type
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="suite">Suite</option>
                  <option value="standard">Standard</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                <Search size={20} />
                Search Rooms
              </button>
            </div>
          </div>

          {/* Available Rooms */}
          <h3 className="text-xl font-semibold text-white mb-4">
            Available Rooms
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`bg-gray-800 rounded-xl p-6 border-2 transition-all duration-300 cursor-pointer ${
                  selectedRoom === room.id
                    ? "border-cyan-500 bg-gray-800/50"
                    : "border-gray-700 hover:border-gray-600"
                }`}
                onClick={() => setSelectedRoom(room.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {room.type} #{room.id}
                    </h4>
                    <p className="text-gray-400">{room.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed size={20} className="text-gray-400" />
                    <span className="text-gray-300">
                      Max {room.maxGuests} guests
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock size={18} />
                    <span>Check-in: {room.checkInTime}</span>
                  </div>
                  <div className="flex gap-2">
                    {room.amenities.map((amenity, index) => (
                      <div key={index} className="p-2 bg-gray-700 rounded-lg">
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold text-white">
                      ${room.price}
                    </div>
                    <div className="text-gray-400">per night</div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRoom(room.id);
                    }}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      selectedRoom === room.id
                        ? "bg-gradient-to-r from-green-600 to-emerald-600"
                        : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                    }`}
                  >
                    {selectedRoom === room.id ? (
                      <>
                        <Check size={18} className="inline mr-2" />
                        Selected
                      </>
                    ) : (
                      "Select Room"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Summary */}
          {selectedRoom && (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                Booking Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Selected Room</span>
                      <span className="font-semibold text-white">
                        {rooms.find((r) => r.id === selectedRoom)?.type} #
                        {selectedRoom}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-gray-400 text-sm">
                      <span>Check-in: {checkIn}</span>
                      <span>Check-out: {checkOut}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">
                        Room Rate (3 nights)
                      </span>
                      <span className="text-white">$360</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Tax & Fees</span>
                      <span className="text-white">$40</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Service Charge</span>
                      <span className="text-white">$20</span>
                    </div>
                    <div className="border-t border-gray-700 pt-3">
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold text-white">
                          Total Amount
                        </span>
                        <span className="font-bold text-white">$420</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-white mb-4">
                      Payment Options
                    </h4>
                    <div className="space-y-3">
                      {["Credit Card", "PayPal", "Bank Transfer"].map(
                        (method) => (
                          <label
                            key={method}
                            className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-800"
                          >
                            <input
                              type="radio"
                              name="payment"
                              className="text-cyan-500 focus:ring-cyan-500"
                            />
                            <span className="text-white">{method}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  <button
                    className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-300"
                    onClick={() => alert("Proceeding to payment...")}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );

  // Render Room Management
  const renderRoomManagement = () => (
    <div className="flex min-h-screen bg-gray-900">
      {renderSidebar(getNavItems("roomManagement"))}

      <div className="flex-1">
        {renderHeader(
          "Room Management",
          "View and manage all rooms and status"
        )}

        <main className="p-6">
          {/* Filters and Actions */}
          <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Filter
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="all">All Rooms</option>
                    <option value="occupied">Occupied</option>
                    <option value="available">Available</option>
                    <option value="cleaning">Cleaning</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search rooms..."
                    className="min-w-[200px] bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2">
                <Plus size={20} />
                Add Room
              </button>
            </div>

            <div className="mt-6">
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Rooms Table */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      ROOM NUMBER
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      ROOM TYPE
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      FLOOR
                    </th>
                    <th className="px6 py-4 text-left text-sm font-semibold text-gray-300">
                      STATUS
                    </th>
                    <th className="px6 py-4 text-left text-sm font-semibold text-gray-300">
                      HOUSEKEEPING
                    </th>
                    <th className="px6 py-4 text-left text-sm font-semibold text-gray-300">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {roomStatusData.map((room) => (
                    <tr
                      key={room.id}
                      className="hover:bg-gray-750 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                            <Building size={20} className="text-gray-300" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">
                              #{room.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white font-medium">
                          {room.type}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-300">{room.floor}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs border ${
                              room.status === "Occupied"
                                ? "bg-purple-900/30 text-purple-300 border-purple-700"
                                : room.status === "Available"
                                ? "bg-green-900/30 text-green-300 border-green-700"
                                : "bg-yellow-900/30 text-yellow-300 border-yellow-700"
                            }`}
                          >
                            {room.status}
                          </span>
                          {room.details && (
                            <span className="text-sm text-gray-400">
                              {room.details}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-gray-300">Last cleaned:</div>
                          <div className="text-sm text-gray-400">
                            {room.cleaning}
                          </div>
                          <div className="text-xs text-gray-500">
                            By: {room.lastCleanedBy}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 bg-blue-900/30 text-blue-400 rounded-lg hover:bg-blue-900/50 transition-colors">
                            <Edit2 size={18} />
                          </button>
                          <button className="p-2 bg-cyan-900/30 text-cyan-400 rounded-lg hover:bg-cyan-900/50 transition-colors">
                            Assign
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  // Render Admin Panel
  const renderAdmin = () => (
    <div className="flex min-h-screen bg-gray-900">
      {renderSidebar(getNavItems("admin"))}

      <div className="flex-1">
        {renderHeader(
          "Admin Management Panel",
          "Manage guests, staff, rooms, and rates"
        )}

        <main className="p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-white mt-2">$12,540</p>
                </div>
                <DollarSign className="text-green-400" size={24} />
              </div>
              <p className="text-green-400 text-sm mt-2">
                +15% from last month
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Occupancy Rate</p>
                  <p className="text-2xl font-bold text-white mt-2">82%</p>
                </div>
                <TrendingUp className="text-blue-400" size={24} />
              </div>
              <p className="text-green-400 text-sm mt-2">+8% from last week</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Stays</p>
                  <p className="text-2xl font-bold text-white mt-2">24</p>
                </div>
                <Calendar className="text-purple-400" size={24} />
              </div>
              <p className="text-green-400 text-sm mt-2">+12% from yesterday</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg. Rating</p>
                  <p className="text-2xl font-bold text-white mt-2">4.7</p>
                </div>
                <Star className="text-yellow-400" size={24} />
              </div>
              <p className="text-green-400 text-sm mt-2">+0.3 this month</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-gray-800 rounded-xl p-1 mb-8 border border-gray-700">
            <div className="flex space-x-1">
              {["guests", "staff", "rooms", "rates"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {tab === "guests" && "Guest Management"}
                  {tab === "staff" && "Staff Management"}
                  {tab === "rooms" && "Room Management"}
                  {tab === "rates" && "Rate Management"}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            {/* Tab Header */}
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {activeTab === "guests" && "Guest Management"}
                  {activeTab === "staff" && "Staff Management"}
                  {activeTab === "rooms" && "Room Management"}
                  {activeTab === "rates" && "Rate Management"}
                </h3>
                <p className="text-sm text-gray-400">
                  Showing 1-10 of {guestsData.length} guests
                </p>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg font-medium">
                  + Add New
                </button>
              </div>
            </div>

            {/* Guests Table */}
            {activeTab === "guests" && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        GUEST ID
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        NAME & CONTACT
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        ACCOUNT STATUS
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        LAST ACTIVITY
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {guestsData.map((guest) => (
                      <tr
                        key={guest.id}
                        className="hover:bg-gray-750 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-mono text-cyan-400">
                            #{guest.id}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                              <Users size={20} className="text-gray-300" />
                            </div>
                            <div>
                              <div className="font-semibold text-white">
                                {guest.name}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Mail size={14} />
                                {guest.email}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Phone size={14} />
                                {guest.phone}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <span className="px-3 py-1 rounded-full text-xs bg-green-900/30 text-green-300">
                              {guest.status}
                            </span>
                            <div className="text-sm text-gray-400 mt-1">
                              Since {guest.since}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-300">
                            {guest.lastActivity}
                          </div>
                          <div className="text-sm text-gray-400">
                            {guest.action}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 bg-blue-900/30 text-blue-400 rounded-lg hover:bg-blue-900/50 transition-colors">
                              <Eye size={18} />
                            </button>
                            <button className="p-2 bg-green-900/30 text-green-400 rounded-lg hover:bg-green-900/50 transition-colors">
                              <Edit2 size={18} />
                            </button>
                            <button className="p-2 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50 transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );

  // Render Reports Page
  const renderReports = () => (
    <div className="flex min-h-screen bg-gray-900">
      {renderSidebar(getNavItems("reports"))}

      <div className="flex-1">
        {renderHeader(
          "Analytics & Reports",
          "Generate insights and performance reports"
        )}

        <main className="p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-cyan-900/20 to-cyan-900/5 rounded-xl p-6 border border-cyan-800/30">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-sm text-cyan-300">Total Revenue</div>
                  <div className="text-3xl font-bold text-white mt-2">
                    $45,250
                  </div>
                </div>
                <div className="px-3 py-1 bg-cyan-900/50 rounded-full text-sm text-cyan-300">
                  +18%
                </div>
              </div>
              <div className="text-sm text-cyan-200/70">Last 30 days</div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 rounded-xl p-6 border border-blue-800/30">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-sm text-blue-300">Avg Occupancy</div>
                  <div className="text-3xl font-bold text-white mt-2">85%</div>
                </div>
                <div className="px-3 py-1 bg-blue-900/50 rounded-full text-sm text-blue-300">
                  +10%
                </div>
              </div>
              <div className="text-sm text-blue-200/70">Across all rooms</div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-purple-900/5 rounded-xl p-6 border border-purple-800/30">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-sm text-purple-300">Total Bookings</div>
                  <div className="text-3xl font-bold text-white mt-2">
                    1,845
                  </div>
                </div>
                <div className="px-3 py-1 bg-purple-900/50 rounded-full text-sm text-purple-300">
                  +25%
                </div>
              </div>
              <div className="text-sm text-purple-200/70">This quarter</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-900/5 rounded-xl p-6 border border-yellow-800/30">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-sm text-yellow-300">Avg Rating</div>
                  <div className="text-3xl font-bold text-white mt-2">
                    4.7/5.0
                  </div>
                </div>
                <div className="px-3 py-1 bg-yellow-900/50 rounded-full text-sm text-yellow-300">
                  +0.4
                </div>
              </div>
              <div className="text-sm text-yellow-200/70">
                Guest satisfaction
              </div>
            </div>
          </div>

          {/* Report Controls */}
          <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Report Type
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="revenue">Revenue Report</option>
                  <option value="occupancy">Occupancy Report</option>
                  <option value="guest">Guest Demographics</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date Range
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="last-week">Last Week</option>
                  <option value="last-month">Last Month</option>
                  <option value="last-quarter">Last Quarter</option>
                </select>
              </div>

              <div className="flex items-end">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <Filter size={20} />
                  Generate Report
                </button>
              </div>
            </div>
          </div>

          {/* Report Preview */}
          <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Report Preview
                </h3>
                <p className="text-gray-400">Monthly revenue analysis</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2">
                  <FileText size={18} />
                  Export CSV
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-colors flex items-center gap-2">
                  <Download size={18} />
                  Download PDF
                </button>
              </div>
            </div>

            {/* Chart Area */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-semibold text-white">
                    Monthly Revenue in USD
                  </h4>
                  <p className="text-gray-400">Peak in December 2025</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">$15,150</div>
                  <div className="text-sm text-green-400">
                    Top Performing Room Type: Deluxe Suite
                  </div>
                </div>
              </div>

              <div className="h-64 flex items-end gap-1">
                {revenueData.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-8 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-lg transition-all duration-300 hover:from-cyan-400 hover:to-blue-400"
                      style={{ height: `${(value / 5000) * 100}%` }}
                    />
                    <div className="text-xs text-gray-400 mt-2">
                      {
                        [
                          "J",
                          "F",
                          "M",
                          "A",
                          "M",
                          "J",
                          "J",
                          "A",
                          "S",
                          "O",
                          "N",
                          "D",
                        ][index]
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
                      ROOM TYPE
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
                      TOTAL BOOKINGS
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
                      REVENUE
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
                      OCCUPANCY RATE
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
                      AVG RATING
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {roomTypes.map((room, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700/50 hover:bg-gray-750 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="font-semibold text-white">
                          {room.type}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-white">{room.bookings}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-green-400 font-semibold">
                          ${room.revenue.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                              style={{ width: `${room.occupancy}%` }}
                            />
                          </div>
                          <span className="text-white">{room.occupancy}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={
                                  i < Math.floor(room.rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-600"
                                }
                              />
                            ))}
                          </div>
                          <span className="text-white">{room.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  // Main render switch
  switch (currentPage) {
    case "login":
      return renderLogin();
    case "dashboard":
      return renderDashboard();
    case "booking":
      return renderBooking();
    case "roomManagement":
      return renderRoomManagement();
    case "admin":
      return renderAdmin();
    case "reports":
      return renderReports();
    default:
      return renderLogin();
  }
};

export default Testcloudinary;
