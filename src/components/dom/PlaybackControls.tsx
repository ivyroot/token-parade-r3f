

export const PlaybackControls = (props) => {

    const playbackState = props.moving ? 'Pause' : 'Play'

    const togglePlayback = () => {
        if (props.moving) {
            props.setMoving(false)
        } else {            
            props.setMoving(true)
        }
    }

    return (
        <div className='flex'>
            <button className='mx-4' onClick={togglePlayback}> back  </button>
            <button className='mx-4' onClick={togglePlayback}>{playbackState}</button>
            <button className='mx-4' onClick={togglePlayback}> fwd  </button>
        </div>
    )

}