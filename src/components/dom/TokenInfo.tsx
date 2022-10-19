
export const TokenInfo = (props) => {
    if (!props.token) {
        return null;
    }
    const osUrl = `https://opensea.io/assets/${props.token.chain}/${props.token.contractAddress}/${props.token.tokenId}`;
    return (
        <div className='text-slate-400'>
            <div className='mx-8 my-2 text-slate-400'>Name:
                <a href={osUrl} target="_blank" rel="noopener noreferrer" className='text-blue-600 link-item px-2'>
                    {props.token.name}
                </a>
            </div>
            <div className='mx-8 my-2 hidden md:block text-slate-400'>Collection: {props.token.collectionName}</div>
            <div className='mx-8 my-2 text-slate-400'>Acquired: {props.token.purchaseDate}</div>
        </div>
    )
}