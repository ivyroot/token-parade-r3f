import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

export const DefaultCamera = () => {
    const camera = useThree((state) => state.camera)
    useEffect(() => {
        console.log(`setting camera position `)
        camera.position.set(0, 5, 5)
    }, [camera])
    return (
        <></>
    )
}