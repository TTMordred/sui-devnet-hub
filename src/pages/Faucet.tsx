
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useWallet } from "@/context/WalletContext";
import { useNavigate } from "react-router-dom";
import BlurContainer from "@/components/BlurContainer";
import { Button } from "@/components/ui/button";
import { Droplet, ArrowRight, Wallet, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import AnimatedGradient from "@/components/AnimatedGradient";
import { Progress } from "@/components/ui/progress";

export default function Faucet() {
  const { isConnected, address, balance, network, connectWallet } = useWallet();
  const navigate = useNavigate();
  const [requesting, setRequesting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastRequestTime, setLastRequestTime] = useState<Date | null>(null);
  const [requestHistory, setRequestHistory] = useState<
    {
      id: string;
      amount: number;
      timestamp: Date;
      status: "completed" | "processing" | "failed";
    }[]
  >([]);

  const handleRequestTokens = () => {
    if (!isConnected) return;

    setRequesting(true);
    setProgress(0);

    const intervalId = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(intervalId);
          setTimeout(() => {
            setRequesting(false);
            const now = new Date();
            setLastRequestTime(now);
            
            const newRequest = {
              id: `req-${Date.now()}`,
              amount: 100,
              timestamp: now,
              status: "completed" as const,
            };
            
            setRequestHistory((prev) => [newRequest, ...prev]);
            
            toast({
              title: "Success!",
              description: "100 SUI tokens have been sent to your wallet.",
            });
          }, 500);
        }
        return newProgress;
      });
    }, 150);
  };

  const formatDate = (date: Date) => {
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
              Please connect your wallet to access the faucet and receive SUI tokens.
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
    <div className="min-h-screen relative">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Sui Network Faucet</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Request SUI tokens for testing and development on the {network}.
              These tokens have no real-world value and are only for testing purposes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="order-2 md:order-1">
              <BlurContainer className="p-6 h-full">
                <h2 className="text-xl font-bold mb-4">Request History</h2>
                {requestHistory.length > 0 ? (
                  <div className="space-y-4">
                    {requestHistory.map((request) => (
                      <BlurContainer
                        key={request.id}
                        className="p-4"
                        blurIntensity="none"
                        backgroundOpacity="low"
                        borderStyle="light"
                        elevation="none"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{request.amount} SUI</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatDate(request.timestamp)}
                            </div>
                          </div>
                          <div>
                            {request.status === "completed" ? (
                              <span className="flex items-center text-green-600 dark:text-green-400">
                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                <span className="text-sm">Completed</span>
                              </span>
                            ) : request.status === "processing" ? (
                              <span className="flex items-center text-yellow-600 dark:text-yellow-400">
                                <Clock className="w-4 h-4 mr-1" />
                                <span className="text-sm">Processing</span>
                              </span>
                            ) : (
                              <span className="flex items-center text-red-600 dark:text-red-400">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                <span className="text-sm">Failed</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </BlurContainer>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No request history yet
                  </div>
                )}
              </BlurContainer>
            </div>

            <div className="order-1 md:order-2">
              <BlurContainer className="p-6 relative overflow-hidden">
                <AnimatedGradient className="!absolute inset-0 !opacity-30" variant="cyan" />
                <div className="text-center mb-6 relative z-10">
                  <Droplet className="w-12 h-12 text-sui-500 mx-auto mb-2" />
                  <h2 className="text-xl font-bold mb-1">Request Tokens</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Current Network: <span className="font-medium capitalize">{network}</span>
                  </p>
                </div>

                <div className="space-y-4 relative z-10">
                  <BlurContainer
                    className="p-4"
                    blurIntensity="none"
                    backgroundOpacity="medium"
                    borderStyle="light"
                    elevation="sm"
                  >
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Wallet Address</div>
                      <div className="text-sm font-medium truncate max-w-[250px]">
                        {address}
                      </div>
                    </div>
                  </BlurContainer>

                  <BlurContainer
                    className="p-4"
                    blurIntensity="none"
                    backgroundOpacity="medium"
                    borderStyle="light"
                    elevation="sm"
                  >
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Current Balance</div>
                      <div className="text-sm font-medium">
                        {balance !== null ? balance.toLocaleString() : "Loading..."} SUI
                      </div>
                    </div>
                  </BlurContainer>

                  <BlurContainer
                    className="p-4"
                    blurIntensity="none"
                    backgroundOpacity="medium"
                    borderStyle="light"
                    elevation="sm"
                  >
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Request Amount</div>
                      <div className="text-sm font-medium">100 SUI</div>
                    </div>
                  </BlurContainer>

                  {lastRequestTime && (
                    <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                      Last requested: {formatDate(lastRequestTime)}
                    </div>
                  )}

                  {requesting ? (
                    <div className="space-y-2">
                      <Progress value={progress} className="h-2" />
                      <div className="text-sm text-center text-gray-600 dark:text-gray-400">
                        Processing request... {progress}%
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={handleRequestTokens}
                      className="w-full group relative overflow-hidden"
                      disabled={requesting}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Request 100 SUI Tokens
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-sui-400 to-sui-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                    </Button>
                  )}

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Note: You can request tokens once every 24 hours.
                  </p>
                </div>
              </BlurContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
