
import { useState, ChangeEvent } from "react";
import Navbar from "@/components/Navbar";
import { useWallet } from "@/context/WalletContext";
import { useNavigate } from "react-router-dom";
import BlurContainer from "@/components/BlurContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Wallet, ArrowRight, Gem, Image, Upload, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import AnimatedGradient from "@/components/AnimatedGradient";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function NFTMint() {
  const { isConnected, address, network, connectWallet } = useWallet();
  const navigate = useNavigate();
  
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [nftImageFile, setNftImageFile] = useState<File | null>(null);
  const [nftImagePreview, setNftImagePreview] = useState<string | null>(null);
  
  const [minting, setMinting] = useState(false);
  const [mintProgress, setMintProgress] = useState(0);
  const [mintedNFTs, setMintedNFTs] = useState<
    Array<{
      id: string;
      name: string;
      description: string;
      image: string;
      mintedAt: Date;
    }>
  >([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setNftImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setNftImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleMintNFT = () => {
    if (!isConnected || !nftName || !nftImagePreview) return;

    setMinting(true);
    setMintProgress(0);

    const intervalId = setInterval(() => {
      setMintProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(intervalId);
          setTimeout(() => {
            setMinting(false);
            
            // Generate a mock NFT ID
            const newNFT = {
              id: `0x${Math.random().toString(16).slice(2, 10)}`,
              name: nftName,
              description: nftDescription,
              image: nftImagePreview,
              mintedAt: new Date(),
            };
            
            setMintedNFTs((prev) => [newNFT, ...prev]);
            
            // Reset form
            setNftName("");
            setNftDescription("");
            setNftImageFile(null);
            setNftImagePreview(null);
            
            toast({
              title: "NFT Minted Successfully!",
              description: `Your NFT "${nftName}" has been minted on the ${network}.`,
            });
          }, 500);
        }
        return newProgress;
      });
    }, 100);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
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
              Please connect your wallet to mint NFTs on the Sui {network}.
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Mint NFTs on Sui {network}</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Create and manage unique digital assets on the Sui Network.
              These NFTs are minted on the {network} for testing purposes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <BlurContainer className="p-6 relative overflow-hidden">
                <AnimatedGradient className="!absolute inset-0 !opacity-30" variant="purple" />
                <div className="text-center mb-6 relative z-10">
                  <Gem className="w-12 h-12 text-sui-500 mx-auto mb-2" />
                  <h2 className="text-xl font-bold mb-1">Create New NFT</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Fill out the details below to mint your NFT
                  </p>
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="space-y-2">
                    <Label htmlFor="nft-name">NFT Name</Label>
                    <Input
                      id="nft-name"
                      placeholder="Enter a name for your NFT"
                      value={nftName}
                      onChange={(e) => setNftName(e.target.value)}
                      disabled={minting}
                      className="glass-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nft-description">Description</Label>
                    <Textarea
                      id="nft-description"
                      placeholder="Describe your NFT (optional)"
                      value={nftDescription}
                      onChange={(e) => setNftDescription(e.target.value)}
                      disabled={minting}
                      className="glass-input min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Upload Image</Label>
                    <div
                      className={cn(
                        "border-2 border-dashed rounded-lg p-4 text-center",
                        nftImagePreview
                          ? "border-sui-300 dark:border-sui-700"
                          : "border-gray-300 dark:border-gray-700"
                      )}
                    >
                      {nftImagePreview ? (
                        <div className="space-y-4">
                          <img
                            src={nftImagePreview}
                            alt="NFT Preview"
                            className="max-h-[200px] mx-auto rounded-lg"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setNftImageFile(null);
                              setNftImagePreview(null);
                            }}
                            disabled={minting}
                          >
                            Remove Image
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Image className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Drag and drop or click to upload
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById("image-upload")?.click()}
                            disabled={minting}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Choose File
                          </Button>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            disabled={minting}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {minting ? (
                    <div className="space-y-2">
                      <Progress value={mintProgress} className="h-2" />
                      <div className="text-sm text-center text-gray-600 dark:text-gray-400">
                        Minting NFT... {mintProgress}%
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={handleMintNFT}
                      className="w-full group relative overflow-hidden"
                      disabled={!nftName || !nftImagePreview || minting}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Mint NFT
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-sui-400 to-sui-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                    </Button>
                  )}

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Gas fees for minting will be deducted from your balance.
                  </p>
                </div>
              </BlurContainer>
            </div>

            <div>
              <BlurContainer className="p-6 h-full">
                <h2 className="text-xl font-bold mb-4">Your NFT Collection</h2>
                {mintedNFTs.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mintedNFTs.map((nft) => (
                      <BlurContainer
                        key={nft.id}
                        className="p-4 transition-all duration-300 hover:shadow-lg"
                        elevation="sm"
                        backgroundOpacity="low"
                      >
                        <div className="aspect-square w-full rounded-lg overflow-hidden mb-2">
                          <img
                            src={nft.image}
                            alt={nft.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="font-medium truncate">{nft.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <Check className="w-3 h-3 mr-1 text-green-500" />
                            Minted on {formatDate(nft.mintedAt)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                            ID: {nft.id}
                          </div>
                        </div>
                      </BlurContainer>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center">
                    <Gem className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-4" />
                    <div className="text-gray-500 dark:text-gray-400">
                      You haven't minted any NFTs yet
                    </div>
                    <div className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                      Mint your first NFT to see it here
                    </div>
                  </div>
                )}
              </BlurContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
