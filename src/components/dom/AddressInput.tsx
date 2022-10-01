import { UseParadeState  } from '../../hooks/UseParadeState'

export const AddressInput = (props) => {
  const addressInput = UseParadeState((state) => state.addressInput)
  const setAddressInput = UseParadeState((state) => state.setAddressInput)
  const addressValue = UseParadeState((state) => state.addressValue)
  const setAddressValue = UseParadeState((state) => state.setAddressValue)
  const setIsLoading = UseParadeState((state) => state.setIsLoading)

  const startParade = () => {
    if (addressInput !== addressValue) {
      setAddressValue(addressInput)
      setIsLoading(true)
    } else {
      props.onRestart();
    }
    props.setFocusedNft(null)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      startParade()
    }
  }
  return (
    <div className='px-4 pt-4 pb-8 shadow-xl text-gray-800 bg-gray-300 rounded-lg'>
        <h2 className='text-xl text-center my-4'>Enter Ethereum address to start token parade</h2>
        <div className='flex items-center pt-2 pb-4 md:pb-2'>
            <input 
              type="text" 
              className='inline p-2 mx-2 text-sm text-slate-800 md:w-96' 
              placeholder='0x123abc456...' 
              value={addressInput} 
              onChange={(e) => {setAddressInput(e.target.value)}} 
              onKeyDown={handleKeyDown} 
            />
            <button className='mx-4' onClick={startParade}>Go!</button>
        </div>
    </div>
  )
}
