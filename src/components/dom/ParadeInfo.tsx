import { UseParadeState  } from '../../hooks/UseParadeState'
import { TokenInfo } from './TokenInfo'
import { UseEns } from '../../hooks/UseEns'

export const ParadeInfo = (params) => {
    const address = UseParadeState((state) => state.addressValue)
    const isLoading = UseParadeState((state) => state.isLoading)
    const loadingMsg = isLoading ? 'Loading...' : ''
    const ensLookup = UseEns(address)
    const paradeOwnerName = (ensLookup && ensLookup.displayName) ? ensLookup.displayName : null
    const paradeFor = paradeOwnerName ? ` for ${paradeOwnerName}`: ''
    const description = address ? `Token Parade${paradeFor}!` : ''
    const instructions = address ? `Click & drag to rotate` : ''
    return (
        <div className='text-s md:text-base text-gray-50'>
            <div className='mx-8 my-2 text-slate-400'>{description}</div>
            <div className='mx-8 my-2 text-slate-400'>{loadingMsg}</div>
            <TokenInfo token={params.focusedNft} />
            <div className='fixed top-1 right-2 mx-8 my-2 text-pink-400'>{instructions}</div>
        </div>
    )
}
