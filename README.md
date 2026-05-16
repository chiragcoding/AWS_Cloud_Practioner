<div align="center">

# ☁️ AWS Zero to Cloud Hero

### The ultimate interactive study guide for AWS Cloud Practitioner (CLF-C02)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

<br />

<p align="center">
  <strong>Study smarter, not harder.</strong><br/>
  Interactive notes · Exam scenarios · Comparison tables · AI tutor
</p>

<br />

---

</div>

<br />

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📚 **9 Comprehensive Topics** | From IAM to VPC, everything you need for CLF-C02 |
| 🤖 **AI Study Buddy** | Gemini-powered chatbot on every topic page for instant doubt clearing |
| 📊 **Comparison Tables** | Side-by-side service comparisons for quick revision |
| 🎯 **Exam Scenarios** | Real-world scenarios mapped to correct answers |
| 💡 **Memory Aids & Tips** | Mnemonics and exam tips throughout every topic |
| 📱 **Fully Responsive** | Beautiful on desktop, tablet, and mobile |
| ⚡ **Fast & Modern** | Built with Next.js 15 App Router + Tailwind CSS 4 |

<br />

## 📖 Topics Covered

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   🔐 IAM          Identity & Access Management          │
│   🖥️ EC2          Elastic Compute Cloud                 │
│   💾 EBS          Elastic Block Store & Storage          │
│   ⚖️ ELB & ASG    Load Balancers & Auto Scaling         │
│   🪣 S3           Simple Storage Service                │
│   🗄️ Databases    RDS, Aurora, DynamoDB & More           │
│   🌐 Route 53     DNS & Domain Management               │
│   📊 CloudWatch   Monitoring & Observability            │
│   🔒 VPC          Virtual Private Cloud & Networking    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

<br />

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed
- A free [Gemini API key](https://aistudio.google.com/apikey) (for the AI chatbot)

### Installation

```bash
# Clone the repository
git clone https://github.com/chiragcoding/aws-zero-to-cloud-hero.git

# Navigate to the project
cd aws-prep

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
```

> 💡 Get your free Gemini API key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

<br />

## 🏗️ Tech Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 |
| **AI** | Google Gemini via Vercel AI SDK |
| **Deployment** | Vercel |

</div>

<br />

## 📁 Project Structure

```
aws-prep/
├── src/
│   ├── app/
│   │   ├── api/chat/        # AI chatbot API route
│   │   ├── topics/
│   │   │   ├── iam/         # IAM topic page
│   │   │   ├── ec2/         # EC2 topic page
│   │   │   ├── ebs/         # EBS & Storage page
│   │   │   ├── elb-asg/     # ELB & ASG page
│   │   │   ├── s3/          # S3 topic page
│   │   │   ├── databases/   # Databases page
│   │   │   ├── route53/     # Route 53 page
│   │   │   ├── cloudwatch/  # CloudWatch page
│   │   │   └── vpc/         # VPC & Networking page
│   │   ├── page.tsx         # Home page
│   │   ├── layout.tsx       # Root layout
│   │   └── globals.css      # Global styles
│   └── components/
│       ├── Sidebar.tsx       # Navigation sidebar
│       ├── Chatbot.tsx       # AI chatbot component
│       ├── TopicHeader.tsx   # Topic page header
│       ├── TopicLayout.tsx   # Topic page wrapper
│       └── TopicSection.tsx  # Reusable content components
├── public/                   # Static assets
├── package.json
└── tsconfig.json
```

<br />

## 🎨 Design Philosophy

- **Glass morphism** — Frosted glass sidebar and floating elements
- **Micro-interactions** — Hover animations, staggered reveals, card shine effects
- **Clean typography** — Inter font with carefully tuned sizes and weights
- **Color-coded topics** — Each topic has its own gradient identity
- **Mobile-first** — Responsive from 320px to 4K displays

<br />

## 📝 How to Use

1. **Browse topics** from the sidebar or home page cards
2. **Read through** the structured notes with exam tips highlighted
3. **Use comparison tables** to understand service differences
4. **Review exam scenarios** at the bottom of each topic
5. **Ask the AI chatbot** any doubts — it gives exam-focused answers

<br />

## 🤝 Contributing

Contributions are welcome! If you'd like to add more topics, fix content, or improve the UI:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-topic`)
3. Commit your changes (`git commit -m 'Add new topic'`)
4. Push to the branch (`git push origin feature/new-topic`)
5. Open a Pull Request

<br />

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

<br />

---

<div align="center">

**Built with ❤️ for the AWS community**

<sub>Study smarter. Pass the exam. Become a Cloud Hero. ☁️✨</sub>

</div>
