export const ParadeLink = (props) => {
    const link = props.a ? `https://www.tokenparade.xyz/?a=${props.a}` : ''
    const linkText = props.a ? `www.tokenparade.xyz/?a=${props.a}` : ''
    if (link === '') {
        return null
    }
    return(
        <a href={link} target='_blank' className='block px-1 mx-8 my-2'>
            <div className='flex'>
                <img src='/ic-external-link.svg' alt='external link' className="w-2.5 pt-0.5 mr-1.5" />
                <div className='text-slate-600'>{linkText}</div>
            </div>
        </a>
    )
}