
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useWallet } from "@/context/WalletContext";
import { useNavigate } from "react-router-dom";
import BlurContainer from "@/components/BlurContainer";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  ArrowRight,
  RefreshCcw,
  Coins,
  Gem,
  Code,
  ExternalLink,
  Clock,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import FeatureCard from "@/components/FeatureCard";

export default function Dashboard() {
  const { isConnected, address, balance, network, connectWallet } = useWallet();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock transaction data
  useEffect(() => {
    if (isConnected) {
      const mockTransactions = [
        {
          id: "tx-1",
          type: "Transfer",
          amount: "10",
          status: "Confirmed",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: "tx-2",
          type: "NFT Mint",
          amount: "-5",
          status: "Confirmed",
          timestamp: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "tx-3",
          type: "Contract Call",
          amount: "-2",
          status: "Confirmed",
          timestamp: new Date(Date.now() - 172800000).toISOString(),
        },
      ];

      setTimeout(() => {
        setTransactions(mockTransactions);
        setLoading(false);
      }, 1500);
    }
  }, [isConnected]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16 flex flex-col items-center justify-center">
          <BlurContainer className="max-w-md mx-auto p-8 text-center">
            <Wallet className="w-12 h-12 mx-auto mb-4 text-sui-500" />
            <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Please connect your wallet to access the dashboard and interact
              with the Sui {network}.
            </p>
            <Button
              onClick={connectWallet}
              className="w-full group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                Connect Wallet
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-sui-400 to-sui-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </Button>
          </BlurContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar - Wallet details */}
          <div className="lg:col-span-1">
            <BlurContainer className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Wallet Details</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className={refreshing ? "animate-spin" : ""}
                >
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Address
                  </div>
                  <div className="flex items-center">
                    <div className="text-sm font-medium truncate">
                      {address}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Network
                  </div>
                  <div className="text-sm px-2 py-1 bg-sui-100 dark:bg-sui-900/50 rounded-full text-sui-700 dark:text-sui-300 inline-block capitalize">
                    {network}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Balance
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {balance !== null ? balance.toLocaleString() : "Loading..."}
                    <span className="ml-1 text-lg font-medium">SUI</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4 border-sui-200 dark:border-sui-800 hover:bg-sui-50 dark:hover:bg-sui-900/30"
                  onClick={() => navigate("/faucet")}
                >
                  <Coins className="mr-2 h-4 w-4" />
                  Get Tokens from Faucet
                </Button>
              </div>
            </BlurContainer>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mt-6">
              <FeatureCard
                title="Mint NFTs"
                description="Create and manage non-fungible tokens"
                icon={Gem}
                variant="primary"
                layout="icon-left"
                onClick={() => navigate("/nft-mint")}
              />
              <FeatureCard
                title="Deploy Contracts"
                description="Deploy and interact with smart contracts"
                icon={Code}
                variant="primary"
                layout="icon-left"
                onClick={() => navigate("/contracts")}
              />
            </div>
          </div>

          {/* Main content - Activity and Stats */}
          <div className="lg:col-span-2 space-y-6">
            <BlurContainer className="p-6">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>

              {loading ? (
                <div className="space-y-4 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <BlurContainer
                      key={tx.id}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                      blurIntensity="none"
                      backgroundOpacity="none"
                      borderStyle="light"
                      elevation="none"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{tx.type}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDate(tx.timestamp)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-medium ${
                              tx.amount.startsWith("-")
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {tx.amount} SUI
                          </div>
                          <div className="mt-1">
                            <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300">
                              {tx.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </BlurContainer>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-500 dark:text-gray-400">
                    No recent activity found
                  </div>
                </div>
              )}

              <div className="mt-4 text-center">
                <Button
                  variant="link"
                  className="text-sui-600 dark:text-sui-400"
                  onClick={() => {
                    // Would navigate to a full transaction history in a real app
                  }}
                >
                  View All Transactions
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </BlurContainer>

            <BlurContainer className="p-6">
              <h2 className="text-xl font-bold mb-4">Network Stats</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="text-sm font-medium">Gas Usage</div>
                    <div className="text-sm text-gray-500">64%</div>
                  </div>
                  <Progress value={64} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="text-sm font-medium">
                      {network} Block Height
                    </div>
                    <div className="text-sm text-gray-500">1,243,098</div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="text-sm font-medium">
                      {network} Network Status
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                      <span className="text-sm text-green-600 dark:text-green-400">
                        Operational
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </BlurContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
