// WaterLand Water Park Data Structure

export const parkInfo = {
  name: "baliraja agro tourism",
  tagline: "The Biggest Theme & Amusement Park",
  description: "Experience the ultimate water adventure with thrilling rides, exciting attractions, and unforgettable memories for the whole family.",
  contact: {
    address: "At.post malgaom G NO 2481, TAL MIRAJ DIST SANGLI, Miraj, Miraj, Sangli- 416410, Maharashtra",
    phone: "(+012) 3456 7890",
    email: "balirajaagrotourism01@gmail.com"
  },
  hours: {
    weekdays: "11:00 AM - 16:00 PM",
    weekends: "09:00 AM - 17:00 PM",
    holidays: "09:00 AM - 17:00 PM"
  }
};

export const services = [
  {
    id: 1,
    title: "Private Gazebo",
    description: "Enjoy exclusive private spaces with comfortable seating and shade for your family gatherings.",
    icon: "gazebo",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Delicious Food",
    description: "Savor mouth-watering meals and refreshing beverages at our various food courts and restaurants.",
    icon: "food",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Safety Lockers",
    description: "Secure storage facilities to keep your belongings safe while you enjoy the water attractions.",
    icon: "locker",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "River Rides",
    description: "Experience thrilling water adventures on our exciting river rides and water coasters.",
    icon: "water",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export const attractions = [
  {
    id: 1,
    name: "Roller Coaster",
    description: "Heart-pounding thrills on our signature water roller coaster",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Thrill Rides"
  },
  {
    id: 2,
    name: "Carousel",
    description: "Classic family fun on our beautifully decorated water carousel",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Family Rides"
  },
  {
    id: 3,
    name: "Arcade Games",
    description: "Indoor entertainment with exciting arcade games and prizes",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Games"
  },
  {
    id: 4,
    name: "Hanging Carousel",
    description: "Soar through the air on our suspended carousel ride",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Aerial Rides"
  },
  {
    id: 5,
    name: "Wave Pool",
    description: "Surf the waves in our massive artificial wave pool",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Water Attractions"
  },
  {
    id: 6,
    name: "Lazy River",
    description: "Relax and float along our peaceful lazy river",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Water Attractions"
  }
];

export const packages = [
  {
    id: 1,
    name: "Basic Package",
    price: 2000,
    unit: "person",
    popular: false,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    features: [
      "Pool Access",
      "Basic Locker",
      "1 Meal Voucher",
      "Safety Equipment",
      "Basic First Aid"
    ]
  },
  {
    id: 2,
    name: "Family Package",
    price: 6500,
    unit: "family",
    popular: true,
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    features: [
      "All Pool Access",
      "Premium Locker",
      "Family Meal Deal",
      "Priority Booking",
      "Free Parking",
      "Kids Play Area",
      "Family Photo Session"
    ]
  },
  {
    id: 3,
    name: "VIP Package",
    price: 3500,
    unit: "person",
    popular: false,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    features: [
      "All Premium Access",
      "VIP Locker Room",
      "Unlimited Food & Drinks",
      "Personal Attendant",
      "Express Lane Access",
      "Spa Services",
      "Private Cabana"
    ]
  }
];

export const teamMembers = [
  {
    id: 1,
    name: "David James",
    position: "Park Manager",
    description: "20+ years of experience in theme park management and customer service excellence.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 2,
    name: "William John",
    position: "Safety Director",
    description: "Ensuring the highest safety standards for all our guests and attractions.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 3,
    name: "Michael John",
    position: "Guest Experience Manager",
    description: "Dedicated to creating magical experiences and unforgettable memories for every visitor.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#"
    }
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Mother of 3",
    review: "WaterLand exceeded all our expectations! The kids had an absolute blast, and the safety measures made us feel completely at ease. We'll definitely be back!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    position: "Adventure Enthusiast",
    review: "The thrill rides here are incredible! The roller coaster and water slides provided the perfect adrenaline rush. Best water park experience ever!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Emily Chen",
    position: "Family Vacation Planner",
    review: "Perfect for families! Clean facilities, friendly staff, and attractions for all ages. The VIP package was worth every penny for the convenience.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "Why Children Don't Like Getting Out Of The Water",
    excerpt: "Discover the psychology behind children's love for water and how to make the most of your water park visit.",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2024-08-15",
    author: "Dr. Amanda Wilson"
  },
  {
    id: 2,
    title: "5 Ways To Enjoy Waterland This Spring Break",
    excerpt: "Make the most of your spring break vacation with these insider tips for the ultimate WaterLand experience.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2024-08-10",
    author: "Mark Thompson"
  },
  {
    id: 3,
    title: "3 Tips for Your Family Spring Break at Amusement Park",
    excerpt: "Planning a family trip? Here are essential tips to ensure everyone has an amazing time at our water park.",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2024-08-05",
    author: "Lisa Garcia"
  }
];

export const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Wave Pool Fun",
    category: "Water Attractions"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Family Pool Time",
    category: "Family Fun"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Thrilling Rides",
    category: "Thrill Rides"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Roller Coaster",
    category: "Thrill Rides"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Carousel Fun",
    category: "Family Fun"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Happy Families",
    category: "Family Fun"
  }
];

export const features = [
  {
    id: 1,
    title: "Best Waterpark in the world",
    description: "Award-winning water park with world-class attractions and facilities.",
    icon: "fas fa-trophy"
  },
  {
    id: 2,
    title: "Best Packages For Your Family",
    description: "Affordable pricing options designed to give your family the best value.",
    icon: "fas fa-users"
  },
  {
    id: 3,
    title: "Enjoy Various Kinds of Water Park",
    description: "Multiple themed areas with different experiences for all age groups.",
    icon: "fas fa-water"
  },
  {
    id: 4,
    title: "Win Up To 3 Free All Day Tickets",
    description: "Participate in our contests and events to win exciting prizes.",
    icon: "fas fa-gift"
  }
];
