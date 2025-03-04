
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { BookOpen, FileText, Video, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlurContainer from "@/components/BlurContainer";
import FeatureCard from "@/components/FeatureCard";

const Resources = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Hero
          title="Developer Resources"
          subtitle="Access documentation, tutorials, and community resources to help you build on Sui Network"
          gradient="cyan"
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <FeatureCard
            title="Documentation"
            description="Comprehensive guides and API references for the Sui blockchain"
            icon={BookOpen}
            variant="secondary"
            onClick={() => window.open("https://docs.sui.io", "_blank")}
          />
          <FeatureCard
            title="Tutorials"
            description="Step-by-step guides to learn Sui development"
            icon={FileText}
            variant="secondary"
            onClick={() => window.open("https://docs.sui.io/guides/developer", "_blank")}
          />
          <FeatureCard
            title="Video Guides"
            description="Visual walkthroughs and educational content"
            icon={Video}
            variant="secondary"
            onClick={() => window.open("https://www.youtube.com/c/SuiNetwork", "_blank")}
          />
          <FeatureCard
            title="Community"
            description="Join the conversation with other Sui developers"
            icon={Users}
            variant="secondary"
            onClick={() => window.open("https://discord.gg/sui", "_blank")}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BlurContainer className="p-6">
            <h2 className="text-xl font-semibold mb-4">Latest Updates</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Sui Move Developer Bootcamp",
                  date: "June 2023",
                  link: "#",
                  description: "Join our online bootcamp to learn Move programming from scratch.",
                },
                {
                  title: "Sui Framework v1.2.0 Release",
                  date: "May 2023",
                  link: "#",
                  description: "New features and improvements for the Sui framework.",
                },
                {
                  title: "Introducing Sui Explorer API",
                  date: "April 2023",
                  link: "#",
                  description: "Access blockchain data programmatically with our new API.",
                },
                {
                  title: "Move Language Specification Update",
                  date: "March 2023",
                  link: "#",
                  description: "Important changes to the Move language specification.",
                },
              ].map((update) => (
                <div
                  key={update.title}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{update.title}</h3>
                    <span className="text-xs text-gray-500">{update.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {update.description}
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto mt-2 text-sui-600 dark:text-sui-400"
                    onClick={() => window.open(update.link, "_blank")}
                  >
                    Read more <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </BlurContainer>

          <div className="space-y-6">
            <BlurContainer className="p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
              <ol className="space-y-3 list-decimal list-inside text-gray-700 dark:text-gray-300">
                <li>Install the Sui CLI and development environment</li>
                <li>Create your first Move package with <code>sui move new</code></li>
                <li>Build your package with <code>sui move build</code></li>
                <li>Test your code with <code>sui move test</code></li>
                <li>Deploy your package to devnet with <code>sui client publish</code></li>
              </ol>
              <Button className="mt-6" onClick={() => window.open("https://docs.sui.io/build/install", "_blank")}>
                Install Sui CLI
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </BlurContainer>

            <BlurContainer className="p-6">
              <h2 className="text-xl font-semibold mb-4">Top Resources</h2>
              <div className="space-y-3">
                {[
                  {
                    title: "Move Language Book",
                    description: "Comprehensive guide to the Move programming language",
                    link: "https://move-language.github.io/move/",
                  },
                  {
                    title: "Sui Examples",
                    description: "Repository of example Move packages and applications",
                    link: "https://github.com/MystenLabs/sui/tree/main/examples",
                  },
                  {
                    title: "Sui Framework Reference",
                    description: "Documentation for the Sui framework modules and functions",
                    link: "https://github.com/MystenLabs/sui/tree/main/crates/sui-framework",
                  },
                ].map((resource) => (
                  <div key={resource.title} className="group">
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h3 className="font-medium flex items-center group-hover:text-sui-600 dark:group-hover:text-sui-400">
                        {resource.title}
                        <ExternalLink className="ml-2 h-3 w-3 opacity-50 group-hover:opacity-100" />
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {resource.description}
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            </BlurContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
