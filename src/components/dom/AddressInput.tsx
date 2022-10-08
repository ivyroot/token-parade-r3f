import { UseParadeState  } from '../../hooks/UseParadeState'
import { useSpring, animated } from 'react-spring'

export const AddressInput = (props) => {
  const addressInput = UseParadeState((state) => state.addressInput)
  const setAddressInput = UseParadeState((state) => state.setAddressInput)
  const addressValue = UseParadeState((state) => state.addressValue)
  const setAddressValue = UseParadeState((state) => state.setAddressValue)
  const setIsLoading = UseParadeState((state) => state.setIsLoading)
  const displayInput = UseParadeState((state) => state.displayInput)
  const setDisplayInput = UseParadeState((state) => state.setDisplayInput)
  const setTokenCount = UseParadeState((state) => state.setTokenCount)

  const startParade = () => {
    if (addressInput !== addressValue) {
      setAddressValue(addressInput)
      setIsLoading(true)
    } else {
      props.onRestart();
    }
    props.setFocusedNft(null)
  }

  const chooseNewParade = () => {
    setAddressValue(null)
    setTokenCount(0)
    setDisplayInput(true)
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      startParade()
    }
  }
  const styles = useSpring({ 
    left: displayInput ? '50%' : '50%',
    bottom: displayInput ? '50%' : '3%',
    transform: 'translate(-50%, -50%)'
  })

  const inputClass = displayInput ? 'block' : 'hidden'
  const runningClass = displayInput ? 'hidden' : 'block'

  return (
    <animated.div style={styles} className='absolute px-6 py-2 shadow-xl text-gray-800 bg-gray-300 rounded-lg'>
        <div className={inputClass}>
          <h2 className='text-xl text-center my-4'>Enter Ethereum address to start token parade</h2>
          <div className='flex items-center pt-2 mb-4'>
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
        <div className={runningClass}>
          <div className='flex'>
            <button className='m-2' onClick={startParade}>Restart</button>
            <button className='m-2' onClick={chooseNewParade}>New</button>
          </div>
        </div>
    </animated.div>
  )
}
