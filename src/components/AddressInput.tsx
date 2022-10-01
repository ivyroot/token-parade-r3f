import { UseParadeState  } from '../hooks/UseParadeState'

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
    } else if (props.onRestart) {
      props.onRestart();
    }
    if (props.setFocusedNft) {
        props.setFocusedNft(null)
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      startParade()
    }
  }
  return (
    <div
      className='px-4 py-2 text-sm shadow-xl bg-slate-300 text-gray-50 rounded-lg'
    >
      <div className='flex items-center pt-2 pb-4 md:pb-2'>
        <div>
          <div className='inline p-2 mr-1'>Enter Address:</div>
          <input type="text" className='inline p-2 mx-2 text-sm text-slate-800 md:w-96' placeholder='0x123abc456...' value={addressInput} onChange={(e) => {setAddressInput(e.target.value)}} onKeyDown={handleKeyDown} />
        </div>
        <button className='mx-4' onClick={startParade}>Go!</button>
      </div>
    </div>
  )
}
