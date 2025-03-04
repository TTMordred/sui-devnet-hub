
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

type Network = 'devnet' | 'testnet';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: number | null;
  network: Network;
  connecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (network: Network) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [network, setNetwork] = useState<Network>('devnet');
  const [connecting, setConnecting] = useState<boolean>(false);

  // Check for saved wallet connection on mount
  useEffect(() => {
    const savedWalletState = localStorage.getItem('walletState');
    if (savedWalletState) {
      try {
        const { address, network } = JSON.parse(savedWalletState);
        if (address) {
          setAddress(address);
          setIsConnected(true);
          setNetwork(network || 'devnet');
          // In a real app, we would verify the connection is still valid
          fetchBalance(address, network || 'devnet');
        }
      } catch (e) {
        console.error('Failed to restore wallet connection', e);
        localStorage.removeItem('walletState');
      }
    }
  }, []);

  // Mock function to fetch balance - would connect to Sui SDK in production
  const fetchBalance = async (walletAddress: string, selectedNetwork: Network) => {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock balance based on network
    const mockBalance = selectedNetwork === 'devnet' ? 1000 : 500;
    setBalance(mockBalance);
  };

  const connectWallet = async () => {
    try {
      setConnecting(true);
      
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock address
      const mockAddress = `0x${Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      
      setAddress(mockAddress);
      setIsConnected(true);
      
      // Save connection to localStorage
      localStorage.setItem('walletState', JSON.stringify({
        address: mockAddress,
        network
      }));
      
      // Fetch initial balance
      await fetchBalance(mockAddress, network);
      
      toast({
        title: "Wallet Connected",
        description: `Connected to ${network} successfully.`,
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to wallet. Please try again.",
        variant: "destructive"
      });
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
    setBalance(null);
    localStorage.removeItem('walletState');
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected."
    });
  };

  const switchNetwork = (newNetwork: Network) => {
    setNetwork(newNetwork);
    
    if (isConnected && address) {
      // Update local storage with new network
      localStorage.setItem('walletState', JSON.stringify({
        address,
        network: newNetwork
      }));
      
      // Refetch balance for the new network
      fetchBalance(address, newNetwork);
      
      toast({
        title: "Network Switched",
        description: `Switched to ${newNetwork} successfully.`
      });
    }
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance,
        network,
        connecting,
        connectWallet,
        disconnectWallet,
        switchNetwork
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  
  return context;
}
