

export const PlaybackControls = (props) => {

    const playbackState = props.moving ? 'Pause' : 'Play'

    const togglePlayback = () => {
        if (props.moving) {
            props.setMoving(false)
        } else {            
            props.setMoving(true)
        }
    }

    const jumpBack = () => {
        props.jumpPlaybackPosition((props.currentJumpOffset === -5.0) ? -5.1 : -5.0)
    }

    const jumpForward = () => {
        props.jumpPlaybackPosition((props.currentJumpOffset === 5.0) ? 5.1 : 5.0)
    }

    return (
        <div className='flex'>
            <button className='mx-4' onClick={jumpBack}> Back  </button>
            <button className='mx-4' onClick={togglePlayback}>{playbackState}</button>
            <button className='mx-4' onClick={jumpForward}> Fwd  </button>
        </div>
    )

}