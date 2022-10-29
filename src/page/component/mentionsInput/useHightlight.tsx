import { useState, useEffect } from 'react'
type keyCode = 'ArrowUp' | 'ArrowDown' 
function useHightlight(showData: any) {
    const [ hightlightIndex, setHightlightIndex ] = useState< number >( -1 )

    const hightlight = ( index: number ) => {
        if( index < 0 ) index = 0
        if( showData?.length && index >= showData?.length ) index = showData.length - 1
        setHightlightIndex( index )
    }

    const setKeyCode = ( value: keyCode ) => {
        let Index;
        
        if(  value === 'ArrowDown' ) {
            Index = hightlightIndex + 1
        } else if( value === 'ArrowUp'  ){
            Index = hightlightIndex - 1
        }else {
            Index = hightlightIndex
        }

        hightlight( Index )
    }

    const setHightlightInit = () => {
        setHightlightIndex( -1 )
    }
  return [ hightlightIndex, setKeyCode, setHightlightInit ] as any
}

export default useHightlight;