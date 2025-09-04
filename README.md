# My Profile - Programmer Portfolio

A modern Next.js application with Tailwind CSS and internationalization (i18n) to display a programmer's profile. It includes navigable sections for profile and blog, optimized for deployment on Vercel.

## 🚀 Features

- **Next.js 14** with TypeScript
- **Tailwind CSS** for modern and responsive styling
- **Internationalization (i18n)** with support for Spanish and English
- **Responsive design** that works on all devices
- **Profile section** with personal information, skills, and experience
- **Blog section** with articles on development and technology
- **Optimized for Vercel** with production-ready configuration

## 🛠️ Technologies used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- next-i18next
- Vercel (for deployment)

## 📦 Installation

1. Clone the repository:

```bash
git clone <your-repository>
cd myprofile
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Internationalization

The application supports two languages:

- **Spanish** (default)
- **English**

You can change the language using the selector in the navigation bar.

## 📁 Project structure

```
myprofile/
├── components/          # Reusable components
│   ├── MDXComponents.tsx  # MDX components
│   ├── SEO.tsx           # SEO component
│   ├── AboutSEO.tsx      # About SEO component
│   ├── Layout.tsx      # Main layout with navigation
│   └── sections/       # Sections
│       ├── BlogSection.tsx     # Blog section
│       ├── ContactSection.tsx  # Contact section
│       ├── CompaniesSection.tsx  # Companies section
│       ├── AboutSection.tsx    # About section
│       ├── Footer.tsx          # Footer
│       └── ProfileSection.tsx      # Profile section
├── pages/              # Application pages
│   ├── _app.tsx        # App configuration
│   ├── index.tsx       # Profile page
│   └── blog        # Blog page
        ├── [slug].tsx  # Blog post page
        └── index.tsx   # Blog index page
├── public/
│   └── locales/        # Translation files
│       ├── es/         # Spanish translations
│       └── en/         # English translations
├── styles/             # Global styles
└── vercel.json         # Vercel configuration
```

## 🚀 Deploy to Vercel

1. Connect your repository to Vercel
2. Vercel will automatically detect that it is a Next.js project
3. Deployment will happen automatically

Or you can use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## 🎨 Customization

### Change personal information

Edit the `components/ProfileSection.tsx` file to update:

- Personal information
- Skills
- Work experience
- Education
- Contact information

### Add blog posts

Modify the `blogPosts` array in `components/BlogSection.tsx` to add new posts.

### Change colors and styles

Customize colors in `tailwind.config.js` and styles in `styles/globals.css`.

## 📝 Available scripts

- `npm run dev` - Run the development server
- `npm run build` - Build the application for production
- `npm run start` - Run the application in production mode
- `npm run lint` - Run the linter

## 🤝 Contributions

Contributions are welcome. Please:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
