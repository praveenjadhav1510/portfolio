# Portfolio Website

A modern, fast-loading portfolio website built with Next.js and Tailwind CSS. Features instant navigation with JSON-based data management for easy content updates.

## Features

### Portfolio Website
- **Modern Design**: Clean, responsive design with smooth animations
- **Dark/Light Mode**: Theme switching capability
- **Instant Loading**: No loading delays - all content loads instantly
- **Typing Animation**: Animated tagline on homepage
- **Name Toggle**: Switch between full name and nickname
- **Responsive**: Works perfectly on all devices
- **SEO Optimized**: Proper meta tags and structure

### Easy Content Management
- **JSON-Based**: Simple JSON file for all content
- **No Database**: No external dependencies or setup required
- **Direct Editing**: Edit `data/portfolio.json` to update content
- **Instant Updates**: Changes reflect immediately after deployment

### Pages Included
- Home (with typing animation and quick links)
- About (intro and education timeline)
- Skills (categorized skill display)
- Projects (project showcase with tech stacks)
- Resume (PDF viewer and download)
- Contact (contact form and information)
- Interests (hobbies and personal interests)
- GitHub (GitHub profile integration)

## Setup Instructions

### 1. Installation

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

### 2. Content Customization

Edit the `data/portfolio.json` file to update your portfolio content:

\`\`\`json
{
  "profile": {
    "name": "Your Name",
    "nickname": "Nickname",
    "tagline": "Your tagline",
    "githubUsername": "username",
    "profileImage": "image_url"
  },
  "about": {
    "intro": "Your introduction",
    "education": [...]
  },
  "skills": ["skill1", "skill2", ...],
  "projects": [...],
  "contact": {...},
  "interests": {...}
}
\`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── about/                    # About page
│   ├── skills/                   # Skills page
│   ├── projects/                 # Projects page
│   ├── resume/                   # Resume page
│   ├── contact/                  # Contact page
│   ├── interests/                # Interests page
│   ├── github/                   # GitHub page
│   └── api/                      # API routes
├── components/
│   ├── ui/                       # UI components
│   ├── Navigation.tsx            # Main navigation
│   ├── TypingAnimation.tsx       # Typing effect
│   └── BackToTop.tsx            # Scroll to top
├── contexts/
│   └── PortfolioDataContext.tsx # Data management context
├── hooks/
│   └── usePortfolioData.tsx     # Data management hook
└── data/
    └── portfolio.json           # Portfolio data (edit this file)
\`\`\`

## Content Management

### Data Structure

The portfolio data in `data/portfolio.json` follows this structure:

\`\`\`json
{
  "profile": {
    "name": "Your Name",
    "nickname": "Nickname", 
    "tagline": "Your professional tagline",
    "githubUsername": "your-github-username",
    "profileImage": "path/to/your/image.jpg"
  },
  "about": {
    "intro": "Your introduction paragraph",
    "education": [
      {
        "level": "Degree Name",
        "year": 2023,
        "score": "Grade/Percentage"
      }
    ]
  },
  "skills": ["JavaScript", "React", "Node.js", "..."],
  "projects": [
    {
      "title": "Project Name",
      "description": "Project description",
      "techStack": ["React", "Node.js"],
      "github": "https://github.com/username/repo",
      "demo": "https://demo-url.com"
    }
  ],
  "resume": {
    "pdf": "/path/to/resume.pdf"
  },
  "contact": {
    "emails": ["email1@example.com", "email2@example.com"],
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username"
  },
  "interests": {
    "hobbies": ["Hobby 1", "Hobby 2", "Hobby 3"]
  }
}
\`\`\`

### Updating Content

1. Open `data/portfolio.json`
2. Edit the values you want to change
3. Save the file
4. Redeploy or restart the development server

## Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: Radix UI, Lucide React
- **Data**: JSON file (no database required)
- **Deployment**: Vercel (recommended)

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy (no environment variables needed)

### Other Platforms

This portfolio works on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Customization

### Styling
- Modify `app/globals.css` for global styles
- Update color scheme in CSS variables
- Customize components in `components/ui/`

### Content
- Edit `data/portfolio.json` for all content updates
- Add your resume PDF to the `public` folder
- Update profile image path in the JSON file

### Adding New Sections
- Create new page components in the `app` directory
- Add navigation links in `components/Navigation.tsx`
- Update the JSON structure if needed

## Performance

This portfolio is optimized for speed:
- **No external API calls** during runtime
- **Static data loading** from JSON
- **Instant navigation** between pages
- **Optimized images** and assets
- **Minimal JavaScript** bundle

## License

This project is open source and available under the MIT License.
