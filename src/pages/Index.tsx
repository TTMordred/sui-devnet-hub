
import { useNavigate } from "react-router-dom";
import { ArrowRight, Coins, Code, Gem, Layers, Wallet } from "lucide-react";
import Hero from "@/components/Hero";
import BlurContainer from "@/components/BlurContainer";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";
import { cn } from "@/lib/utils";
import { useWallet } from "@/context/WalletContext";

const Index = () => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();

  const features = [
    {
      title: "Wallet Connect",
      description: "Securely connect your Sui wallet to interact with the devnet and testnet.",
      icon: Wallet,
      path: "/dashboard",
      variant: "primary"
    },
    {
      title: "Faucet Access",
      description: "Request SUI tokens to test and develop on the network.",
      icon: Coins,
      path: "/faucet",
      variant: "primary"
    },
    {
      title: "NFT Minting",
      description: "Create and manage non-fungible tokens on the testnet.",
      icon: Gem,
      path: "/nft-mint",
      variant: "primary"
    },
    {
      title: "Contract Deployment",
      description: "Deploy and test smart contracts before going live.",
      icon: Code,
      path: "/contracts",
      variant: "primary"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden pb-10">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-sui-50/50 to-transparent dark:from-sui-950/20 dark:to-transparent -z-10" />
      
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-purple-50/30 to-transparent dark:from-purple-950/10 dark:to-transparent -z-10 translate-x-1/3 -translate-y-1/3" />
      
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-cyan-50/30 to-transparent dark:from-cyan-950/10 dark:to-transparent -z-10 -translate-x-1/3 translate-y-1/3" />
      
      <Navbar />
      
      <main className="container px-4 sm:px-6 lg:px-8 mx-auto pt-32 relative z-0">
        <Hero
          title={
            <span>
              Sui Network <span className="text-sui-500">Testnet Platform</span>
            </span>
          }
          subtitle="Develop and test on Sui Network's testnet with an intuitive platform for wallet connection, faucet access, NFT minting, and smart contract deployment."
          size="lg"
          hasBackground={false}
        >
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Button
              size="lg"
              className="group relative overflow-hidden"
              onClick={() => navigate(isConnected ? "/dashboard" : "/")}
            >
              <span className="relative z-10 flex items-center">
                {isConnected ? "Go to Dashboard" : "Connect Wallet"}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-sui-400 to-sui-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-sui-200 dark:border-sui-800 hover:bg-sui-50 dark:hover:bg-sui-900/30"
              onClick={() => navigate("/resources")}
            >
              Learn More
            </Button>
          </div>
        </Hero>
        
        <section className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to develop and test your applications on Sui Network's testnet and devnet environments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                variant={feature.variant as any}
                onClick={() => navigate(feature.path)}
                className={cn(
                  "hover:translate-y-[-4px]",
                  index % 2 === 0 ? "animate-fade-in-1" : "animate-fade-in-2"
                )}
              />
            ))}
          </div>
        </section>
        
        <section className="py-16">
          <BlurContainer className="p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-sui-100 to-transparent dark:from-sui-900/20 dark:to-transparent opacity-70 -z-10 translate-x-1/4 -translate-y-1/4" />
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Ready to Build on Sui Network?</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Get started with our comprehensive tools and resources designed to make developing on Sui Network simple and efficient.
                </p>
                <Button
                  className="group relative overflow-hidden"
                  onClick={() => navigate("/resources")}
                >
                  <span className="relative z-10 flex items-center">
                    Explore Resources
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-sui-400 to-sui-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                </Button>
              </div>
              
              <div className="flex-1 flex justify-center">
                <BlurContainer
                  className="p-6 w-full max-w-sm animate-float"
                  backgroundOpacity="high"
                  elevation="lg"
                >
                  <div className="flex items-center justify-center mb-4">
                    <Layers className="h-10 w-10 text-sui-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">Sui Devnet Stack</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Wallet Integration
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      Move Smart Contracts
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                      NFT Standard Support
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      Transaction Explorer
                    </li>
                  </ul>
                </BlurContainer>
              </div>
            </div>
          </BlurContainer>
        </section>
      </main>
      
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-auto">
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sui-300 to-sui-500 flex items-center justify-center text-white font-bold text-lg">
                  S
                </div>
                <span className="ml-2 text-lg font-semibold">Sui Testnet</span>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Designed for Sui Network developers and users. Not affiliated with Sui Foundation.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
