import './App.css';
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { AddressInput } from './components/dom/AddressInput.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NftGroup } from './components/canvas/NftGroup'
import { ParadeInfo } from './components/dom/ParadeInfo'
import { DefaultCamera } from './components/canvas/DefaultCamera'
import { UseParadeState  } from './hooks/UseParadeState'
import { UseEns } from './hooks/UseEns'

const queryClient = new QueryClient()

function App() {
  const address = UseParadeState((state) => state.addressValue)
  const ensLookup = UseEns(address)
  const paradeOwnerName = (ensLookup && ensLookup.displayName) ? ensLookup.displayName : null
  const paradeFor = paradeOwnerName ? ` for ${paradeOwnerName}`: ''
  const title = address ? `Token Parade${paradeFor}!` : 'Token Parade!'
  const [focusedNft, setFocusedNft] = useState(null)
  const [moving, setMoving] = useState(true)
  const [startedAt, setStartedAt] = useState(Date.now())
  const onRestart = () => {
    setStartedAt(Date.now())
  }
  const [jumpOffset, setJumpOffset] = useState(0)
  const jumpPlaybackPosition = (amount) => {
    setJumpOffset(amount)
  }
  return (
    <>
      <div className=''>
        <h1 className='mx-8 mt-4 md:mt-2 font-bold'>{title}</h1>
      </div>
      <div className='absolute top-10 left-0'>
        <ParadeInfo focusedNft={focusedNft} />
      </div>
      <AddressInput setFocusedNft={setFocusedNft} onRestart={onRestart} moving={moving} setMoving={setMoving} currentJumpOffset={jumpOffset} jumpPlaybackPosition={jumpPlaybackPosition} ></AddressInput>

      <div className='absolute top-0 h-screen w-screen -z-10'>
        <Canvas>
          <DefaultCamera />
          <OrbitControls />
          <QueryClientProvider client={queryClient}>
            <NftGroup initialPos={[0, 0, 0]} setFocusedNft={setFocusedNft} startedAt={startedAt} moving={moving} jumpOffset={jumpOffset} />
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
