import { useQuery } from '@tanstack/react-query'
import { UseParadeState  } from '../hooks/UseParadeState'

export const MaxPages = 5
export const MaxTokens = MaxPages * 50

export interface NftTokenInfo {
    id: string;
    tokenId: string;
    name: string;
    collectionName: string;
    chain: string,
    contractAddress: string,
    previewImageMedium: string | null;
    purchaseDate: string;
    purchaseTimestamp: number;
}

export interface NftTokenResponse {
    status: string;
    nfts: NftTokenInfo[] | null;
}

const parseSimpleHashInfo = (token: any, address: string): NftTokenInfo => {
    const ownerHistory = token.owners.find(t => t.owner_address === address)
    const purchaseDate = ownerHistory ? ownerHistory.first_acquired_date : '2022-09-27T00:00:00.000Z'
    const purchaseTimestamp = Date.parse(purchaseDate)
    const dateObject = new Date(purchaseTimestamp);
    const displayDate = dateObject.toLocaleString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    })
    return {
        id: token.nft_id,
        tokenId: token.token_id,
        name: token.name,
        collectionName: token.collection.name,
        chain: token.chain,
        contractAddress: token.contract_address,
        previewImageMedium: token.previews.image_medium_url,
        purchaseDate: displayDate,
        purchaseTimestamp: purchaseTimestamp,
    };
}

const callSimpleHash = (url: string) => fetch(
    url,
    {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.NEXT_PUBLIC_ANALYTICS_ID,
    }})
    .then( res => res.json())

const recursivePromiseWhichCallsSimpleHashAPI = async (url: string, nfts: NftTokenInfo[] = [], page = 1) => {
    if (!url) {
        return []
    }
    const simpleHashResult = await callSimpleHash(url)
    const newNfts = simpleHashResult.nfts
    const newNftsMerged = [...nfts, ...newNfts]
    if (simpleHashResult.next && page < 5) {
        const newPage = page + 1
        return recursivePromiseWhichCallsSimpleHashAPI(simpleHashResult.next, newNftsMerged, newPage)
    } else {
        return newNftsMerged
    }
}

export const UseAddressTokens = (address: string | null): NftTokenResponse => {
    // @ts-ignore
    const fetchTokens = (url: string | null) => recursivePromiseWhichCallsSimpleHashAPI(url)
    const setIsLoading = UseParadeState((state) => state.setIsLoading)
    const setDisplayInput = UseParadeState((state) => state.setDisplayInput)
    const setTokenCount = UseParadeState((state) => state.setTokenCount)
    const queryKey1 = address ? `tokensPage1${address}` : 'tokensPageBlank';
    const urlStart = address ? `https://api.simplehash.com/api/v0/nfts/owners?chains=ethereum&wallet_addresses=${address}` : null;
    const { isLoading, isError, data, error } = useQuery([queryKey1], () => fetchTokens(urlStart));
    if (isLoading) {
        return { status: "progress", nfts: null };
    }
    if (isError) {
        return { status: "error", nfts: null };
    }
    const tokens = data
    .map(a => parseSimpleHashInfo(a, address))   
    .sort((a, b) => a.purchaseTimestamp - b.purchaseTimestamp)
    if (address) {
        setIsLoading(false)
        setDisplayInput(false)
        setTokenCount(tokens.length)
    }
    return { status: "success", nfts: tokens };
}

