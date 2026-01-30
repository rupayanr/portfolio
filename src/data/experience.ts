export interface Experience {
  company: string
  role: string
  period: string
  highlights: string[]
}

export const experiences: Experience[] = [
  {
    company: 'MathCo',
    role: 'Senior Product Engineer',
    period: 'Jan 2024 - Present',
    highlights: [
      'Built real-time streaming microservices',
      'Led team of 10 engineers',
      'Developed voice agent with WebRTC',
    ],
  },
  {
    company: 'Infineon Technologies',
    role: 'Developer II',
    period: 'Mar 2022 - Dec 2023',
    highlights: [
      'Built semiconductor configuration app',
      'Created VS Code extension for internal tooling',
      'Developed Python backend services',
    ],
  },
  {
    company: 'Infosys',
    role: 'Senior Systems Engineer',
    period: 'Dec 2019 - Mar 2022',
    highlights: [
      'Led MySQL to AWS RDS migration',
      'Built CI/CD pipelines',
      'Automated infrastructure provisioning',
    ],
  },
]
