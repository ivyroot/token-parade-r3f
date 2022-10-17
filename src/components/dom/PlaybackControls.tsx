

export const PlaybackControls = (props) => {

    const playbackChangeButton = props.moving ? <img src='/ic-pause.svg' alt='pause' /> : <img src='/ic-play.svg' alt='play' />

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
        <div className='flex my-2'>
            <button className='mx-4' onClick={jumpBack}><img src='/ic-fast-backward.svg' alt='fast backward' /></button>
            <button className='mx-4' onClick={togglePlayback}>{playbackChangeButton}</button>
            <button className='mx-4' onClick={jumpForward}><img src='/ic-fast-forward.svg' alt='fast forward' /></button>
        </div>
    )

}