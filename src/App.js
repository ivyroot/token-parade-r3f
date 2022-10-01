import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { AddressInput } from './components/dom/AddressInput.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NftGroup } from './components/canvas/NftGroup'

const queryClient = new QueryClient()

function App() {
  const [focusedNft, setFocusedNft] = useState(null)
  const [startedAt, setStartedAt] = useState(Date.now())
  const onRestart = () => {
    setStartedAt(Date.now())
  }
  return (
    <>
      <div className='flex'>
        <h1 className='mx-8 my-2'>Token Parade</h1>
      </div>
      <div className='flex justify-center'>
        <AddressInput setFocusedNft={setFocusedNft} onRestart={onRestart}></AddressInput>
      </div>

      <div id="canvas-container">
        <Canvas>
          <QueryClientProvider client={queryClient}>
            <NftGroup initialPos={[0, 0, 0]} setFocusedNft={setFocusedNft} startedAt={startedAt} />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
          </QueryClientProvider>
        </Canvas>
      </div>
    </>
  );
}

export default App;
