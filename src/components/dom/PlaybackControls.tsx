

export const PlaybackControls = (props) => {

    const playbackChangeButton = props.moving ? <img src='/ic-pause.svg' alt='pause' className="w-32 lg:w-8" /> : <img src='/ic-play.svg' alt='play'  className="w-32 lg:w-8"  />

    const togglePlayback = (e) => {
        e.preventDefault()
        if (props.moving) {
            props.setMoving(false)
        } else {
            props.setMoving(true)
        }
    }

    const jumpBack = (e) => {
        e.preventDefault()
        props.jumpPlaybackPosition((props.currentJumpOffset === -5.0) ? -5.1 : -5.0)
    }

    const jumpForward = (e) => {
        e.preventDefault()
        props.jumpPlaybackPosition((props.currentJumpOffset === 5.0) ? 5.1 : 5.0)
    }

    return (
        <div className='flex items-center my-2'>
            <a href='#' className='block px-1' onClick={jumpBack}>
                <img src='/ic-fast-backward.svg' alt='fast backward' className="w-32 lg:w-8" />
            </a>
            <a href='#' className='block px-1' onClick={togglePlayback}>
                {playbackChangeButton}
            </a>
            <a href='#' className='block px-1' onClick={jumpForward}>
                <img src='/ic-fast-forward.svg' alt='fast forward' className="w-32 lg:w-8" />
            </a>
        </div>
    )

}