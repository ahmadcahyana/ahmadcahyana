
import type { LucideIcon } from "lucide-react";
import { Code2, Layers3, GitBranch, Database, Container, Monitor } from "lucide-react";

export type WorkExperienceType = {
  role: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
};

export type EducationType = {
  degree: string;
  institution: string;
  graduation: string;
  gpa: string;
  project: {
    grade: string;
    description: string;
  };
  courses: string[];
};

export type InternshipType = {
  role: string;
  company: string;
  period: string;
  location: string;
  details: string[];
};

export type CvDataType = {
  name: string;
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  summary: string;
  technologies: Record<string, string[]>;
  techIcons: Record<string, LucideIcon>;
  workExperience: WorkExperienceType[];
  education: EducationType;
  internship: InternshipType;
  informalEducation: {
    seminars: string[];
    workshops: string[];
  };
  volunteering: {
    role: string;
    organization: string;
    period: string;
    description: string;
  };
};

export const cvData: CvDataType = {
  name: 'Ahmad Cahyana',
  contact: {
    address: 'Kp Maja No 25 C RT 6 RW 2, Kel. Pegadungan, Kec. Kalideres, Jakarta Barat 11830',
    phone: '08131-67-666-78',
    email: 'ahmadcahyana@outlook.com',
  },
  summary: 'Highly skilled and results-oriented Backend and Fullstack Engineer with 7+ years of progressive experience in software development, including recent leadership roles. Proven ability to develop robust B2B, B2G, and B2C APIs and applications, manage full project lifecycles from design to deployment, and lead small development teams. Recognized for strong programming abilities in multiple languages, keen attention to detail, and a consistent drive to exceed expectations. Experienced in designing migration plans, technical specifications, and collaborating extensively with business analysts, quality assurance, and end-users.',
  technologies: {
    'Programming Languages': ['Python', 'C#', 'PHP', 'Java', 'JavaScript'],
    'Frameworks': ['Django', 'Flask', '.Net Core', 'Laravel', 'CodeIgniter', 'SpringBoot', 'Angular', 'Vue'],
    'Source Code Control': ['Git', 'TFS'],
    'Databases': ['MySQL', 'PostgreSQL', 'MS SQL Server'],
    'No-SQL': ['MongoDB', 'Redis'],
    'Operating Systems': ['Linux', 'Mac OS X', 'Windows'],
  },
  techIcons: {
    'Programming Languages': Code2,
    'Frameworks': Layers3,
    'Source Code Control': GitBranch,
    'Databases': Database,
    'No-SQL': Container,
    'Operating Systems': Monitor,
  },
  workExperience: [
    {
      role: 'Backend Engineer',
      company: 'Chronicle Pty. Ltd. (Chronicle Gerbang Nusantara)',
      period: 'July 2022 – Present',
      location: 'Bali',
      achievements: [
        'Leads a small backend team to ensure timely development of projects.',
        'Develops API for B2B, B2G, and B2C applications and performs related programming tasks.',
        'Analyzes and resolves bugs, enhancing transaction speed and system performance.',
        'Designs Migration Plans and Technical Specifications for Quality Assurance.',
        'Collaborates with Quality Assurance, Business Analysts, and End Users during User Acceptance Testing.',
      ],
    },
    {
      role: 'Fullstack Developer',
      company: 'PT. Bhinneka Mentari Dimensi (Bhinneka.com)',
      period: 'July 2021 – July 2022',
      location: 'Jakarta',
      achievements: [
        'Developed APIs and internal libraries for B2G, B2B, and B2C applications.',
        'Implemented programs aligned with Business Requirements Documents.',
        'Managed development status reporting and designed technical documentation.',
        'Facilitated meetings with QA, Business Analysts, and End Users during UAT.',
      ],
    },
    {
      role: 'Fullstack Developer',
      company: 'PT. Mindo Small Business Solution (RedAwning.com)',
      period: 'March 2021 – July 2021',
      location: 'Yogyakarta',
      achievements: [
        'Developed APIs and internal libraries for B2B and B2C applications.',
        'Contributed to UI development for BackOffice systems using PHP Drupal.',
        'Prepared Migration Plans and Technical Specifications for Quality Assurance.',
        'Participated in User Acceptance Testing meetings with various stakeholders.',
      ],
    },
    {
      role: 'Fullstack Developer',
      company: 'PT. Indocyber Global Teknologi (Asuransiastra.com)',
      period: 'March 2020 – March 2021',
      location: 'Jakarta',
      achievements: [
        'Developed "Asuransi Umum" programs to meet OJK reports specifications for ASURANSI ASTRABUANA.',
        'Implemented Voucher and Discount enhancements for ASURANSI ASTRA BUANA.',
        'Developed B2B Integration between ASURANSI ASTRA BUANA and BANK CENTRAL ASIA (BCA).',
        'Created B2B API e-Policy for ASURANSI ASTRA BUANA.',
        'Developed programs based on Business Requirements Documents and reported development status.',
      ],
    },
    {
      role: 'IT Supervisor',
      company: 'PT. Kurhanz Trans',
      period: 'June 2017 – March 2020',
      location: 'Jakarta',
      achievements: [
        'Led and developed a standalone CRM (Customer Relationship Management) program to manage company interactions with current and potential customers.',
        'Led and developed a comprehensive ERP Program (including Customer Web Portal, CRM & Sales, Distribution, Time & Projects, Dashboard, Finance, Freight Service, Purchasing, Inventory, and Human Resources) to maintain the company’s supply chain.',
        'Built an integrated network across various locations, including Jakarta Headquarter and Branches, Java Branches, and Papua Branches.',
        'Implemented IT strategies, supervised IT staff, and managed technical projects, ensuring compliance with deadlines.',
      ],
    },
    {
      role: 'IT Specialist (Programmer)',
      company: 'PT. Houzcall Teknologi Indonesia',
      period: 'July 2016 – December 2016',
      location: 'Jakarta',
      achievements: [
        'Developed Web-Based backend and frontend for Houzcall.',
        'Automated reports to maximize efficiency.',
        'Developed Android Client for Houzcall.',
        'Implemented user requirements on developed software, analyzed business processes, and ensured clean, readable code.',
      ],
    },
    {
      role: 'ICT Support',
      company: 'PT. Uber Teknologi Indonesia',
      period: 'September 2015 – June 2016',
      location: 'Jakarta',
      achievements: [
        'Developed a Web-Based Solution for product catalogs, company profiles, and a digital library for user guides, product knowledge, and training materials.',
        'Developed software for the management of stock, employees, selling, and billing.',
        'Automated monthly and yearly maintenance reports to maximize efficiency.',
        'Implemented systems to control public company management, analyzed yearly reports, and calculated performance indicators.',
      ],
    },
  ],
  education: {
    degree: 'Bachelor of Science, Major in Information Technology',
    institution: 'STMIK NUSA MANDIRI, Jakarta',
    graduation: 'Graduated 2016',
    gpa: 'GPA: 3.39',
    project: {
      grade: '“A” grade',
      description: 'Earned an “A” grade on capstone project as co-developer of a Web-based, customized enterprise software solution for a nonprofit organization. This turnkey application reduced manual data entry, saving hundreds of personnel hours monthly.',
    },
    courses: ['Enterprise Application Development', 'Security', 'Java/C#/PHP Programming', 'IT Project Management', 'Database Programming', 'Web Design', 'Computer Architecture'],
  },
  internship: {
    role: 'Computer Programmer Intern',
    company: 'PT. Al-Ijarah Indonesia Finance',
    period: 'August 2015 – February 2016',
    location: 'Jakarta',
    details: [
      'Selected for a six-month internship out of more than 75 applicants.',
      'Handled database and Web site programming tasks, primarily using C# and PHP.',
      'Redesigned Internet and intranet pages.',
      'Optimized the company Web site using SEO best practices for improved search engine rankings and enhanced functionality of the company database.',
      'Resolved memory corruption and other technical issues by leveraging strengths in coding, debugging, and integration testing.',
      'Consistently commended by professors and internship supervisor for strong programming abilities, grasp of technologies (e.g., Java, PHP, C#, C++, SharePoint, HTML, CSS), and attention to detail.',
      'Known as a self-starter, team player, and multitasker, consistently striving to exceed expectations.',
    ],
  },
  informalEducation: {
    seminars: [
      'Entrepreneurs in Technology',
      'Mapping Issues in Networking and Science Programs',
      'Preparation for Careers in The World of Work',
      'Professionalism in The Department of Computer Engineering',
      'Cloud Computing as The Future of Computing Solutions',
    ],
    workshops: [
      'Linux Seminars',
      'Introduction to Robotics',
      'Build Network Systems Based on OpenSource Solution',
      'Networking I & II',
    ],
  },
  volunteering: {
    role: 'Extracurricular Teacher',
    organization: 'SMP Arrohman Jakarta',
    period: 'Present',
    description: 'Teaches Python once a week.',
  },
};
