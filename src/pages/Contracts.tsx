
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Code, Share2, ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlurContainer from "@/components/BlurContainer";

const Contracts = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Hero
          title="Smart Contract Deployment"
          subtitle="Deploy and interact with Move-based smart contracts on Sui Devnet and Testnet"
          gradient="purple"
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <BlurContainer className="p-6 h-full">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Code className="mr-2 h-5 w-5 text-purple-500" />
              Deploy Contract
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Upload and deploy your Move smart contract to Sui Devnet or Testnet. Test your code in a safe environment before going to mainnet.
            </p>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md mb-6">
              <pre className="text-sm overflow-x-auto">
                <code>
                  {`module example::counter {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    
    struct Counter has key {
        id: UID,
        value: u64,
    }
    
    public fun create(ctx: &mut TxContext) {
        let counter = Counter {
            id: object::new(ctx),
            value: 0,
        };
        transfer::share_object(counter)
    }
    
    public entry fun increment(counter: &mut Counter) {
        counter.value = counter.value + 1;
    }
}`}
                </code>
              </pre>
            </div>
            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Import from GitHub
              </Button>
              <Button size="sm">
                Deploy Contract
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </BlurContainer>

          <BlurContainer className="p-6 h-full">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Github className="mr-2 h-5 w-5 text-purple-500" />
              Example Contracts
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Browse and deploy sample contracts to learn Sui Move programming or use as a starting point for your own projects.
            </p>
            <div className="space-y-4">
              {[
                {
                  name: "Counter",
                  description: "A simple counter contract that can be incremented",
                  complexity: "Beginner",
                },
                {
                  name: "ERC20-like Token",
                  description: "Implementation of a fungible token standard",
                  complexity: "Intermediate",
                },
                {
                  name: "NFT Collection",
                  description: "Create and manage unique digital assets",
                  complexity: "Intermediate",
                },
                {
                  name: "Marketplace",
                  description: "Buy and sell digital assets with escrow",
                  complexity: "Advanced",
                },
              ].map((contract) => (
                <div
                  key={contract.name}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium">{contract.name}</h3>
                    <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">
                      {contract.complexity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {contract.description}
                  </p>
                </div>
              ))}
            </div>
          </BlurContainer>
        </div>
      </div>
    </div>
  );
};

export default Contracts;
