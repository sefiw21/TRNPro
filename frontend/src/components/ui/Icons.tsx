import {
  Activity,
  Apple,
  BookOpen,
  Brain,
  Church,
  Coins,
  Flame,
  HandHelping,
  HeartPulse,
  Home,
  LayoutDashboard,
  Library,
  Stethoscope,
  Volume2,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  icon: LucideIcon;
  text: string;
  url: string;
}
export const adminNavItems: NavItem[] = [
  { icon: Home, text: " Home", url: "/Home" },
  { icon: Apple, text: "adminDashbord", url: "/admin" },
];

export const mentalNavItems: NavItem[] = [
  { icon: Home, text: "Home", url: "/Home" },
  { icon: LayoutDashboard, text: "Mental Dashboard", url: "/mental" }, // Index route
  { icon: Volume2, text: "Audio Lessons", url: "/mental/Media" },
  { icon: Library, text: "Smart Library", url: "/mental/library" },
  { icon: BookOpen, text: "Reading List", url: "/mental/booklist" },
  { icon: Brain, text: "Focus Exercises", url: "/mental/exercises" }, // Suggested addition
];

export const spiritualNavItems: NavItem[] = [
  { icon: Home, text: " Home", url: "/Home" },
  { icon: LayoutDashboard, text: "Spiritual Center", url: "/spiritual" },
  { icon: HandHelping, text: "Prayer Wall", url: "/spiritual/Prayer" }, // Alternative for prayer
  { icon: HeartPulse, text: "Spiritual Health", url: "/spiritual/Health" },
  { icon: Volume2, text: "Oral Spiritual", url: "/spiritual/Media" },
  { icon: Flame, text: "Daily Devotion", url: "/spiritual/devotion" },
  { icon: Church, text: "Back to Church", url: "/choose_family" },
];

export const physicalNavItems: NavItem[] = [
  { icon: Home, text: " Home", url: "/Home" },
  { icon: LayoutDashboard, text: "Physical Stats", url: "/physical" }, // Index route
  { icon: Stethoscope, text: "Health Advice", url: "/physical/Health" },
  { icon: Activity, text: "Prayer Walk", url: "/physical/Prayer" }, // Using Activity for physical prayer
  { icon: Coins, text: "Income & Stewardship", url: "/physical/Income" },
  { icon: Apple, text: "Nutrition", url: "/physical/nutrition" }, // Suggested addition
];
