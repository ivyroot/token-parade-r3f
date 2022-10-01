import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { AddressInput } from './components/dom/AddressInput.tsx'

function App() {
  return (
    <>
      <div className='flex'>
        <h1 className='mx-8 my-2'>Token Parade</h1>
      </div>
      <div className='flex justify-center'>
        <AddressInput></AddressInput>
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
