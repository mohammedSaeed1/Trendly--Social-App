"use client";

import { useState } from "react";

export const trendingTags = [
  "NextJS",
  "React",
  "JavaScript",
  "TypeScript",
  "NodeJS",
  "ExpressJS",
  "MongoDB",
  "Mongoose",
  "PostgreSQL",
  "SQL",
  "NoSQL",
  "Firebase",
  "Supabase",
  "TailwindCSS",
  "CSS",
  "HTML",
  "Sass",
  "Bootstrap",
  "Frontend",
  "Backend",
  "FullStack",
  "WebDevelopment",
  "Programming",
  "Coding",
  "SoftwareEngineering",
  "Developers",
  "OpenSource",
  "Git",
  "GitHub",
  "GitLab",
  "DevOps",
  "Docker",
  "Kubernetes",
  "Linux",
  "Ubuntu",
  "API",
  "RESTAPI",
  "GraphQL",
  "Authentication",
  "JWT",
  "OAuth",
  "CyberSecurity",
  "CloudComputing",
  "AWS",
  "Azure",
  "GoogleCloud",
  "Vercel",
  "Netlify",
  "Deployment",
  "Performance",
  "SEO",
  "Accessibility",
  "ResponsiveDesign",
  "UIUX",
  "Design",
  "Figma",
  "FramerMotion",
  "Animation",
  "Testing",
  "Jest",
  "Cypress",
  "Vitest",
  "UnitTesting",
  "CleanCode",
  "Refactoring",
  "DataStructures",
  "Algorithms",
  "ProblemSolving",
  "CompetitiveProgramming",
  "LeetCode",
  "CodeWars",
  "Tech",
  "Innovation",
  "ArtificialIntelligence",
  "AI",
  "MachineLearning",
  "DeepLearning",
  "DataScience",
  "BigData",
  "Python",
  "Django",
  "Flask",
  "FastAPI",
  "Java",
  "SpringBoot",
  "CSharp",
  "DotNet",
  "PHP",
  "Laravel",
  "RubyOnRails",
  "GoLang",
  "RustLang",
  "Swift",
  "Kotlin",
  "MobileDevelopment",
  "ReactNative",
  "Flutter",
  "Startups",
  "CareerGrowth",
];

export default function TrendingHashtags() {
  const [showAll, setShowAll] = useState(false);

  const INITIAL_TAGS_COUNT = 15;

  const visibleTags = showAll
    ? trendingTags
    : trendingTags.slice(0, INITIAL_TAGS_COUNT);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      {/* Header */}
      <h3 className="text-sm font-semibold text-white">
        Trending Tags
      </h3>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-2">
        {visibleTags.map((tag) => (
          <span
            key={tag}
            className="
              cursor-pointer
              rounded-full
              border
              border-indigo-500/20
              bg-indigo-500/10
              px-3
              py-1
              text-xs
              font-medium
              text-indigo-300
              transition-all
              duration-300
              ease-in-out
              hover:scale-105
              hover:border-indigo-400/40
              hover:bg-indigo-500/20
              hover:text-indigo-200
              hover:shadow-md
              hover:shadow-indigo-500/20
            "
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* View More / Show Less */}
      {trendingTags.length > INITIAL_TAGS_COUNT && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="
            mt-4
            text-sm
            font-medium
            text-indigo-400
            transition
            hover:text-indigo-300
          "
        >
          {showAll ? "Show Less" : "View More"}
        </button>
      )}
    </div>
  );
}