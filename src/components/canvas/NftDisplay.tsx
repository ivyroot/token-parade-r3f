// ThreeJS component which displays image on a box using a texture
import { useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader, Vector3 } from 'three'

export const NftDisplay = (props) => {
    const mesh = useRef(null)
    const [hovered, setHover] = useState(false)
    const initialPos : Vector3 = props.initialPos ?  props.initialPos : [0, 0, 0]
    const [position, setPosition] = useState(initialPos)
    const [rotation, setRotation] = useState([0, 0, 0])
    const setFocus = () => {
        setHover(true)
        props.setFocusedNft(props.tokenInfo);
    }
    const osUrl = `https://opensea.io/assets/${props.tokenInfo.chain}/${props.tokenInfo.contractAddress}/${props.tokenInfo.tokenId}`;
    const handleClicked = () => {
        if (props.isTouchDevice) {
            props.setFocusedNft(props.tokenInfo);
        } else {
            window.open(osUrl, '_blank');
        }
    }
    const imageUrl: string = props.tokenInfo.previewImageMedium ? props.tokenInfo.previewImageMedium : '/Basic_square.svg';
    const colorMap = useLoader(TextureLoader, imageUrl);
    if (!imageUrl) {
        return (
                <>
                    <mesh
                        ref={mesh}
                        position={position}
                        rotation={[0, Math.PI / 2, 0]}
                        onPointerOver={() => setFocus()}
                        onPointerOut={() => setHover(false)}
                        onClick={handleClicked}
                        scale={hovered ? 1.1 : 1}
                    >
                        <boxGeometry args={[0.1, 2, 2]} />
                        <meshPhysicalMaterial color='hotpink' />
                    </mesh>
                </>
        )
    }
    return (
        <>
            <mesh
                ref={mesh}
                position={position}
                rotation={[0, Math.PI / 2, 0]}
                onPointerOver={() => setFocus()}
                onPointerOut={() => setHover(false)}
                onClick={handleClicked}
                scale={hovered ? 1.1 : 1}
            >
                <boxGeometry args={[0.1, 2, 2]} />
                <meshPhysicalMaterial map={colorMap} />
            </mesh>
        </>
    )
}