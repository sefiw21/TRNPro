import {
  BookOpenCheck,
  BriefcaseMedical,
  Flame,
  UsersRound,
} from "lucide-react";

export const LnavItems = [
  { href: "#", lable: "Home" },
  { href: "#", lable: "About" },
  { href: "#", lable: "Features" },
  { href: "#", lable: "Testimonials" },
];

export const features = [
  {
    title: "Mental: The Sacred Library",
    description: `Explore a smart digital library featuring oral traditions and sacred literature.
     Deepen your understanding through an immersive learning experience designed for the modern mind.`,
    icon: BookOpenCheck,
  },
  {
    title: "Management: Church Stewardship",
    description: `Empowering church fathers with advanced tools to manage growing congregations.
     A seamless system designed to foster humanity and organize our spiritual community efficiently.`,
    icon: UsersRound,
  },
  {
    title: "Physical: Holistic Growth",
    description: `Empowering your earthly journey with professional career guidance and holistic health advice. 
    We bridge the gap between spiritual well-being and physical prosperity.`,
    icon: BriefcaseMedical,
  },
  {
    title: "Spiritual: Orthodox Life",
    description: `A dedicated guide for Ethiopian Orthodox Christians to live a life of practical holiness.
     Discover the path to becoming a perfect practitioner of our ancient and sacred faith.`,
    icon: Flame,
  },
];
