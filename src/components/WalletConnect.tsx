
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import BlurContainer from "./BlurContainer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wallet, LogOut, Copy, ExternalLink, ChevronDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function WalletConnect() {
  const {
    isConnected,
    address,
    balance,
    network,
    connecting,
    connectWallet,
    disconnectWallet,
    switchNetwork,
  } = useWallet();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const formatAddress = (addr: string | null) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  // Animation when connecting
  const connectingClasses = connecting
    ? "animate-pulse bg-sui-100 dark:bg-sui-900/30"
    : "";

  if (!isConnected) {
    return (
      <Button
        onClick={connectWallet}
        disabled={connecting}
        className={cn(
          "group relative overflow-hidden transition-all duration-300",
          connectingClasses
        )}
        size="sm"
      >
        <span className="relative z-10 flex items-center gap-2">
          <Wallet className="w-4 h-4" />
          {connecting ? "Connecting..." : "Connect Wallet"}
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-sui-400 to-sui-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
      </Button>
    );
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 border border-sui-200 dark:border-sui-800 hover:bg-sui-50 dark:hover:bg-sui-900/30 transition-all duration-200"
          size="sm"
        >
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
            <span className="font-medium text-sm">{formatAddress(address)}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 mt-1" align="end">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm font-medium">Connected Wallet</span>
          <span className="text-xs text-muted-foreground">
            {formatAddress(address)}
          </span>
        </DropdownMenuLabel>
        <BlurContainer
          className="mx-2 my-1 p-3"
          backgroundOpacity="low"
          elevation="sm"
        >
          <div className="text-xs text-muted-foreground mb-1">Balance</div>
          <div className="flex justify-between items-center">
            <div className="font-medium">
              {balance !== null ? balance.toLocaleString() : "Loading..."}
              <span className="ml-1 text-sm">SUI</span>
            </div>
            <div className="text-xs px-2 py-1 bg-sui-100 dark:bg-sui-900/50 rounded-full text-sui-700 dark:text-sui-300 capitalize">
              {network}
            </div>
          </div>
        </BlurContainer>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => switchNetwork(network === "devnet" ? "testnet" : "devnet")}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Switch to {network === "devnet" ? "Testnet" : "Devnet"}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={copyToClipboard}>
          <Copy className="w-4 h-4 mr-2" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-500 focus:text-red-500"
          onClick={disconnectWallet}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
