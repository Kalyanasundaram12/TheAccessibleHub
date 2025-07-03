import type { Event, Resource, TeamMember, Testimonial } from '@/types';

export const mockEvents: Event[] = [
  {
    id: 'event-1',
    title: 'Brainstorm - Your First AI Class',
    date: '2025-06-16',
    description: '🧠 Introduction to Artificial Intelligence | AI From Scratch - Episode 1',
    longDescription: 'Welcome to the first episode of our AI From Scratch series — your go-to guide to understand the world of Artificial Intelligence (AI) from the ground up Whether you are a working professional from a non-tech background, a college student, or just curious about how AI works — this video is tailored for absolute beginners who want to get started in AI.',
    youtubeVideoId: 'N81kTrGxvKA',
    youtubeViewCount: 15,
    resources: [
      { name: 'Read the Blog', url: 'https://dev.to/theaccessibleaihub/brainstorm-your-first-ai-class-kickstarting-your-ai-journey-48c3', type: 'blog' },
      { name: 'Access the Deck', url: 'https://stdntpartners-my.sharepoint.com/:p:/g/personal/deepthi_balasubramanian_studentambassadors_com/EYF6K__fpn5NpE6juwSKQpUBqJI7QNsnzKYGaTJuSNcctw', type: 'ppt' },
    ],
    tags: ['Explainable AI', 'Beginner', 'Workshop'],
    imageUrl: '/logo.jpg',
    imageHint: 'AI concept'
  },
  {
    id: 'event-2',
    title: 'How Real AI Gets Build SDLC for AI',
    date: '2025-06-17',
    description: '🧠 Introduction to SDLC | SDLC From Scratch - Episode 2',
    longDescription: 'Explore the evolution from traditional Software Development Life Cycle (SDLC) methods to cutting-edge Smart Development practices, including AI-driven tools and agile automation. Gain insights into how modern tech is reshaping software engineering for speed, quality, and innovation .This video is for beginners who want to get started in SDLC.',
    youtubeVideoId: 'naJgQSmA1Go',
    youtubeViewCount: 10,
    resources: [
      { name: 'Read the Blog', url: 'https://dev.to/theaccessibleaihub/from-waterfall-to-agile-reimagining-the-sdlc-with-azure-ai-48bc', type: 'blog' },
      { name: 'Access the Deck', url: 'https://stdntpartners-my.sharepoint.com/:p:/g/personal/kalyanasundaram_v_studentambassadors_com/EU6ha17mKwJApCginTDyYbQBuAO2et8hDj_BsFsO9ffhdg?e=gqKOW1', type: 'ppt' },
    ],
    tags: ['Ethical AI', 'Panel Discussion', 'Advanced'],
    imageUrl: '/logo.jpg',
    imageHint: 'ethics discussion'
  },
  {
    id: 'event-3',
    title: 'Unlocking GenAI Azure AI Foundry',
    date: '2025-06-27',
    description: '🧠 Introduction to GenAI | GenAI From Scratch - Episode 3 ',
    longDescription: 'The talk focused on recent breakthroughs in Generative AI (GenAI) and their growing influence across key industries such as healthcare, education, and creative work. In healthcare, GenAI is enabling faster diagnostics, supporting drug discovery. This video is for beginners who want to get started in GenAI.',
    youtubeVideoId: 'T9UTsU4S11M',
    youtubeViewCount: 10,
    resources: [
      { name: 'Read the Blog', url: 'https://dev.to/theaccessibleaihub/how-genai-gets-smarter-the-power-of-context-with-rag-313h', type: 'blog' },
      { name: 'Access the Deck', url: 'https://stdntpartners-my.sharepoint.com/:p:/g/personal/kalyanasundaram_v_studentambassadors_com/EXHxx0j5K9dLt6XuW5BzPpwBPm9BhtDqN2Yr8qGjF2p7MA?e=XoClQd', type: 'ppt' },
    ],
    tags: ['GenAI', 'Past Event', 'Tech Talk'],
    imageUrl: '/logo.jpg',
    imageHint: 'language processing'
  },
  {
    id: 'event-4',
    title: 'Data Cleaning 101',
    date: '2025-06-28',
    description: '🧠 Introduction to Data | Data Cleaning From Scratch - Episode 4 ',
    longDescription: 'Episode 4 of "Data Cleaning From Scratch" dives into the fundamentals of data what it is types, and why its crucial.This episode lays the groundwork for understanding why clean, accurate data is essential for analysis, decision-making, and building reliable machine learning models.This video is for beginners who want to get started in Data Cleaning',
    youtubeVideoId: '9CAG4Szod3U',
    youtubeViewCount: 12,
    resources: [
      { name: 'Read the Blog', url: '#', type: 'blog' },
      { name: 'Access the Deck', url: 'https://stdntpartners-my.sharepoint.com/:p:/g/personal/kalyanasundaram_v_studentambassadors_com/Ef4DkMKC1vlPmrX8Dohuy-0BaG5ap9APB4SQDwJS6jbWKQ?e=09A1pV', type: 'ppt' },
    ],
    tags: ['Data', 'Past Event', 'Tech Talk'],
    imageUrl: '/logo.jpg',
    imageHint: 'language processing'
  },
  {
    id: 'event-5',
    title: 'No Code ML Made with Clipchamp',
    date: '2025-07-02',
    description: '🧠 Introduction to No Code | NO Code ML From Scratch - Episode 5 ',
    longDescription: 'Build your first machine learning model without writing a single line of code using Azure Machine Learning Studio! In this quick guide, we’ll show you how to upload data, train a model, and deploy it – all through a simple drag-and-drop interface.This video is for beginners who want to get started in No Code',
    youtubeVideoId: 'X4-U1Pc3gk4',
    youtubeViewCount: 13,
    resources: [
      { name: 'Read the Blog', url: 'https://dev.to/theaccessibleaihub/smart-vision-no-code-app-dev-without-writing-a-single-line-5dpm', type: 'blog' },
      { name: 'Access the Deck', url: 'https://stdntpartners-my.sharepoint.com/:p:/g/personal/leerish_arvind_studentambassadors_com/EaVP_Q_vAKJFlKL9rcccrrkB9ONnx82gB2f-Z7moZuB5VQ?e=EW3Xk7', type: 'ppt' },
    ],
    tags: ['Machine Learning', 'Past Event', 'Tech Talk'],
    imageUrl: '/logo.jpg',
    imageHint: 'language processing'
  },
];

export const mockResources: Resource[] = [
  {
    id: 'res-1',
    title: 'Session 1 : Brainstorm - First AI Class',
    description: 'A comprehensive guide for beginners to understand the fundamentals of Artificial Intelligence.',
    category: 'AI Basics',
    downloadUrl: 'https://stdntpartners-my.sharepoint.com/:p:/g/personal/deepthi_balasubramanian_studentambassadors_com/EYF6K__fpn5NpE6juwSKQpUBqJI7QNsnzKYGaTJuSNcctw',
    type: 'ppt',
    tags: ['AI', 'Beginner', 'Fundamentals'],
    imageUrl: '/Banner1.png',
    imageHint: 'data charts'
  },
  {
    id: 'res-2',
    title: 'How Real AI Gets Build SDLC for AI',
    description: 'A collection of tools and practices for building and developing  AI responsibly.',
    category: 'AI Basics',
    downloadUrl: 'https://stdntpartners-my.sharepoint.com/:p:/g/personal/kalyanasundaram_v_studentambassadors_com/EU6ha17mKwJApCginTDyYbQBuAO2et8hDj_BsFsO9ffhdg?e=gqKOW1',
    type: 'ppt',
    tags: ['AI', 'Beginner', 'Fundamentals'],
    imageUrl: '/Banner2.png',
    imageHint: 'AI ethics'
  },
  {
    id: 'res-3',
    title: 'Unlocking GenAI Azure AI Foundry',
    description: 'Detailed notes from our  workshop on Gen AI techniques.',
    category: 'AI Basics',
    downloadUrl: 'https://stdntpartners-my.sharepoint.com/:p:/g/personal/kalyanasundaram_v_studentambassadors_com/EXHxx0j5K9dLt6XuW5BzPpwBPm9BhtDqN2Yr8qGjF2p7MA?e=XoClQd',
    type: 'ppt',
    tags: ['AI', 'Workshop', 'Advanced'],
    imageUrl: '/Banner3.png',
    imageHint: 'text analysis'
  },
  {
    id: 'res-4',
    title: 'Data Cleaning 101',
    description: 'A comprehensive guide for beginners to understand the fundamentals of Data Cleaning.',
    category: 'ML Basics',
    downloadUrl: 'https://stdntpartners-my.sharepoint.com/:p:/g/personal/kalyanasundaram_v_studentambassadors_com/Ef4DkMKC1vlPmrX8Dohuy-0BaG5ap9APB4SQDwJS6jbWKQ?e=09A1pV',
    type: 'ppt',
    tags: ['Data Cleaning', 'Machine Learning', 'Beginner'],
    imageUrl: '/Banner4.png',
    imageHint: 'network diagram'
  },
    {
    id: 'res-5',
    title: 'No Code ML Made with Clipchamp',
    description: 'A comprehensive guide for beginners to understand the fundamentals of No Code ML',
    category: 'ML Basics',
    downloadUrl: 'https://stdntpartners-my.sharepoint.com/:p:/g/personal/leerish_arvind_studentambassadors_com/EaVP_Q_vAKJFlKL9rcccrrkB9ONnx82gB2f-Z7moZuB5VQ?e=EW3Xk7',
    type: 'ppt',
    tags: ['Data Cleaning', 'Machine Learning', 'Beginner'],
    imageUrl: '/Banner5.png',
    imageHint: 'Hi diagram'
  },
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Deepthi Balasubramanian',
    role: 'Gold MLSA',
    bio: 'Deepthi is passionate about making AI understandable and beneficial for everyone. She specializes in AI ethics and responsible innovation.',
    imageUrl: '/deepthi.jpg',
    imageHint: 'portrait woman',
    linkedinUrl: 'https://www.linkedin.com/in/deepthibalasubramanian'
  },
  {
    id: 'team-2',
    name: 'Kalyanasundaram V',
    role: 'Gold MLSA',
    bio: 'Kalyan has extensive experience in developing and deploying machine learning models. He focuses on practical applications of AI.',
    imageUrl: '/kalyan.jpg',
    imageHint: 'portrait man',
    linkedinUrl: 'https://www.linkedin.com/in/kalyanasundaram-v-48b21a229'
  },
  {
    id: 'team-3',
    name: 'Leerish Arvind',
    role: 'Beta MLSA',
    bio: 'Leerish ensures our community is inclusive and accessible. He champions user-friendly design and clear communication.',
    imageUrl: '/leerish.jpg',
    imageHint: 'portrait person',
    linkedinUrl: 'https://www.linkedin.com/in/leerish-arvind'
  },
];
export const mockAssociates: TeamMember[] = [
  {
    id: 'assoc-1',
    name: 'Keerthi AJ',
    role: 'MLSA Beta',
    bio: 'Keerthi is a Beta MLSA and an Associate at The Accessible AI Hub',
    linkedinUrl: 'https://www.linkedin.com/in/keerthi-avirneni-91354824a'
  },
  // {
  //   id: 'assoc-2',
  //   name: 'Katherine Johnson',
  //   role: 'Data Science Associate',
  //   bio: 'Katherine assists with complex data analysis and computational projects, ensuring accuracy and reliability in our findings.',
  //   imageUrl: 'https://placehold.co/300x300.png',
  //   imageHint: 'portrait woman mathematician'
  // },
];
export const mockTestimonials: Testimonial[] = [
  // {
  //   id: 'test-1',
  //   name: 'Alex Johnson',
  //   role: 'Workshop Attendee',
  //   testimonial: 'The "Intro to Explainable AI" workshop was fantastic! It broke down complex topics into understandable concepts. I feel much more confident in my understanding of AI ethics.',
  //   imageUrl: 'https://placehold.co/100x100.png',
  //   imageHint: 'portrait person happy'
  // },
  // {
  //   id: 'test-2',
  //   name: 'Samantha Lee',
  //   role: 'Community Member',
  //   testimonial: 'Being a part of The Accessible AI Hub has been incredibly rewarding. The resources are top-notch and the community is so supportive. It\'s a great place to learn and grow.',
  //   imageUrl: 'https://placehold.co/100x100.png',
  //   imageHint: 'portrait woman smiling'
  // },
  // {
  //   id: 'test-3',
  //   name: 'David Chen',
  //   role: 'Beginner Learner',
  //   testimonial: 'I started with zero knowledge about AI. The guides and beginner-friendly events gave me the perfect starting point. Highly recommended for anyone curious about AI.',
  //   imageUrl: 'https://placehold.co/100x100.png',
  //   imageHint: 'portrait man student'
  // }
];
