import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { AddressInput } from './components/dom/AddressInput.tsx'

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
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshPhysicalMaterial color='hotpink' />
          </mesh>
          <ambientLight intensity={0.1} />
          <directionalLight color="white" position={[0, 0, 5]} />
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
}

export default App;
