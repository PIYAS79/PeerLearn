interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userMajor: string;
  topic: string;
  description: string;
  image?: string;
  category: string;
  timestamp: string;
  status: 'open' | 'accepted' | 'solved';
  acceptedBy?: string;
}

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Alex Chen',
    userAvatar: 'https://picsum.photos/seed/alex/100/100',
    userMajor: 'Physics',
    topic: 'Quantum Mechanics - Schrodinger Equation',
    description: 'I am struggling with the derivation of the time-independent Schrodinger equation for a particle in a 1D box. Need someone to walk me through the boundary conditions. This topic is quite complex and I need a step-by-step explanation of the wave function normalization as well.',
    image: 'https://picsum.photos/seed/physics1/800/400',
    category: 'Physics',
    timestamp: '2m ago',
    status: 'open'
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Sarah Miller',
    userAvatar: 'https://picsum.photos/seed/sarah/100/100',
    userMajor: 'Mathematics',
    topic: 'Advanced Calculus - Triple Integrals',
    description: 'Can someone help me set up the limits for a triple integral in spherical coordinates? The volume is bounded by a cone and a sphere.',
    category: 'Mathematics',
    timestamp: '15m ago',
    status: 'open'
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'David Kim',
    userAvatar: 'https://picsum.photos/seed/david/100/100',
    userMajor: 'Computer Science',
    topic: 'Data Structures - Red-Black Trees',
    description: 'I keep getting confused with the rotation cases during insertion in a Red-Black tree. Looking for a quick visual explanation.',
    image: 'https://picsum.photos/seed/cs1/800/400',
    category: 'Computer Science',
    timestamp: '45m ago',
    status: 'accepted',
    acceptedBy: 'Professor X'
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'Emily Watson',
    userAvatar: 'https://picsum.photos/seed/emily/100/100',
    userMajor: 'Biology',
    topic: 'Molecular Biology - DNA Replication',
    description: 'Need a quick refresher on the roles of different DNA polymerases in prokaryotes vs eukaryotes. Exam tomorrow morning!',
    category: 'Biology',
    timestamp: '1h ago',
    status: 'open'
  }
];


export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  major: string;
  year: string;
  institute: string;
  expertise: string[];
  rating: number;
  reviewsCount: number;
  isOnline: boolean;
  bio: string;
}

export const MOCK_TUTORS: Tutor[] = [
  {
    id: 't1',
    name: 'Dr. Sarah Jenkins',
    avatar: 'https://picsum.photos/seed/tutor1/200/200',
    major: 'Computer Science',
    year: '2020-2024',
    institute: 'Daffodil International University',
    expertise: ['Data Structures', 'Algorithms', 'React Native'],
    rating: 4.9,
    reviewsCount: 128,
    isOnline: true,
    bio: 'Passionate about teaching complex algorithms in a simple way. I have helped over 500 students ace their CS finals.'
  },
  {
    id: 't2',
    name: 'James Wilson',
    avatar: 'https://picsum.photos/seed/tutor2/200/200',
    major: 'Mathematics',
    year: '2021-2025',
    institute: 'MIT',
    expertise: ['Calculus', 'Linear Algebra', 'Statistics'],
    rating: 4.7,
    reviewsCount: 85,
    isOnline: false,
    bio: 'Math doesn\'t have to be scary. Let\'s break down those triple integrals together.'
  },
  {
    id: 't3',
    name: 'Elena Rodriguez',
    avatar: 'https://picsum.photos/seed/tutor3/200/200',
    major: 'Physics',
    year: '2022-2026',
    institute: 'Stanford University',
    expertise: ['Quantum Mechanics', 'Thermodynamics', 'Optics'],
    rating: 4.8,
    reviewsCount: 64,
    isOnline: true,
    bio: 'Specializing in quantum theory and particle physics. I love making abstract concepts tangible.'
  },
  {
    id: 't4',
    name: 'Michael Chen',
    avatar: 'https://picsum.photos/seed/tutor4/200/200',
    major: 'Software Engineering',
    year: '2019-2023',
    institute: 'Daffodil International University',
    expertise: ['System Design', 'Node.js', 'PostgreSQL'],
    rating: 4.5,
    reviewsCount: 210,
    isOnline: true,
    bio: 'Full-stack developer with 4 years of tutoring experience. Practical coding is my focus.'
  }
];
