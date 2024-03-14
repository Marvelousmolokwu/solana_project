import React, { useMemo } from 'react'
import { Routes } from './routes/Routes'
import { ConnectionProvider,WalletProvider } from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { BlogProvider } from './Context/blog'


export default function App() {
  const endpoint = "https://floral-wispy-glade.solana-devnet.quiknode.pro/2ad787f5e81e06083689aa20ee4536eae2edab59/"
  const wallets = useMemo(()=>[ new PhantomWalletAdapter()], [])
  
  return (
    <>
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
<BlogProvider>
<Routes/>
</BlogProvider>
    
      </WalletProvider>
    </ConnectionProvider>
  
    </>
  )
}
