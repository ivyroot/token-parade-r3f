import './App.css';
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { AddressInput } from './components/dom/AddressInput.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NftGroup } from './components/canvas/NftGroup'
import { ParadeInfo } from './components/dom/ParadeInfo'
import { DefaultCamera } from './components/canvas/DefaultCamera'

const queryClient = new QueryClient()

function App() {
  const [focusedNft, setFocusedNft] = useState(null)
  const [moving, setMoving] = useState(true)
  const [startedAt, setStartedAt] = useState(Date.now())
  const onRestart = () => {
    setStartedAt(Date.now())
  }
  return (
    <>
      <div className=''>
        <h1 className='mx-8 my-2 font-bold'>Token Parade</h1>
      </div>
      <div className='absolute top-10 left-0'>
        <ParadeInfo focusedNft={focusedNft} />
      </div>
      <AddressInput setFocusedNft={setFocusedNft} onRestart={onRestart} moving={moving} setMoving={setMoving}></AddressInput>

      <div className='absolute top-0 h-screen w-screen -z-10'>
        <Canvas>
          <DefaultCamera />
          <OrbitControls />
          <QueryClientProvider client={queryClient}>
            <NftGroup initialPos={[0, 0, 0]} setFocusedNft={setFocusedNft} startedAt={startedAt} moving={moving} />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
          </QueryClientProvider>
        </Canvas>
      </div>

      <div className='absolute bottom-0 left-0 flex'>
        <a href='https://twitter.com/ivyrootcode' target='_none'>
          <img src='/Twitter-circle-blue.svg' className='opacity-75 w-8 h-8 ml-4 my-3' alt='Twitter' />
        </a>
        <a href='https://github.com/ivyroot/token-parade-r3f' target='_none'>
          <img src='/github-circle-black.png' className='opacity-60 w-8 h-8 ml-4 my-3' alt='GitHub' />
        </a>
      </div>
    </>
  );
}

export default App;
