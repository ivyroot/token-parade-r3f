import { useQuery } from '@tanstack/react-query'
import { UseParadeState  } from '../hooks/UseParadeState'

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

const callSimpleHashAPI = async (url: string) => {
    if (!url) {
        return new Promise((resolve, reject) => {
            const blankResult = {
                    nfts: [],
                    initialData: true
                }
            resolve({
                json: () => blankResult
            })
        });
    } else {
        return fetch(url,
                        {
                            headers: {
                            "Content-Type": "application/json",
                            "X-API-KEY": process.env.NEXT_PUBLIC_ANALYTICS_ID,
                            },
                        })
                    }
}

export const UseAddressTokens = (address: string | null): NftTokenResponse => {
    // @ts-ignore
    const fetchTokens = (url: string | null) => callSimpleHashAPI(url).then((res) => res.json());
    const setIsLoading = UseParadeState((state) => state.setIsLoading)
    const setDisplayInput = UseParadeState((state) => state.setDisplayInput)

    const queryKey1 = address ? `tokensPage1${address}` : 'tokensPageBlank';
    const urlStart = address ? `https://api.simplehash.com/api/v0/nfts/owners?chains=ethereum&wallet_addresses=${address}` : null;
    const { isLoading, isError, data, error } = useQuery([queryKey1], () => fetchTokens(urlStart));

    const query2Active = (data && data.next) ? true : false
    const page2Url = data ? data.next : null;
    const query2Key = `tokensPage2${address}-${query2Active}`;
    const { isLoading: isLoading2, isError: isError2, data: dataPageTwo, error: error2 } = useQuery([query2Key, query2Active], () => fetchTokens(page2Url));

    if (isLoading) {
        return { status: "progress", nfts: null };
    }

    if (isError) {
        return { status: "error", nfts: null };
    }

    if (data.next && isLoading2) {
        return { status: "progress", nfts: null };
    }

    const fullNfts = [ ...data.nfts, ...(dataPageTwo ? dataPageTwo.nfts : []) ]

    const tokens = fullNfts.map((token: any) => {
       return parseSimpleHashInfo(token, address);
    }).sort((a, b) => a.purchaseTimestamp - b.purchaseTimestamp )

    if (address && (!data.next || dataPageTwo)) {
        setIsLoading(false)
        setDisplayInput(false)
    }

    return { status: "success", nfts: tokens };
}

