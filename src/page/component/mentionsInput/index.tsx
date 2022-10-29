import React,{ChangeEvent,KeyboardEvent,useCallback,useEffect,useRef,useState}  from "react";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { Input,InputProps } from "antd";
import useDebounce from "./useDebounce";
import classNames from "classnames";
import './index.less'
import Icon from "../Icon";
import useHightlight from "./useHightlight";

export interface DataSourceObject {
  value: string;
  label?: string
}

export type DataSourceType<T = DataSourceObject> = T 

export interface AutocompleteProps extends Omit<InputProps,'onSelect'>{
    data?:DataSourceType[], // 可以直接传data
    size?:SizeType, // 尺寸
    onSelect?:(item:DataSourceType)=>void, // 选择后的钩子
    renderOption?:(item:any)=>any, //自定渲染
    fetchSuggestions?: (str: any) => DataSourceType[] | Promise<DataSourceType[]>; // 异步请求数据
}

const MentionsInput:React.FC<AutocompleteProps>=(props)=>{

    const {
        data,
        size,
        value,
        onSelect,
        fetchSuggestions,
        renderOption,
        ...reseProps
    }=props
    
    const [ showData, setShowData ] = useState< DataSourceType[] | undefined >( [] )
    const [ inputValue, setInputValue ] = useState( value )
    const [ hightlightIndex, setKeyCode, setHightlightInit ] = useHightlight(showData)
    const [ loading, setLoading ] = useState( false )

    const valueDebounce = useDebounce( inputValue, 500 )

    const isnetwork = useRef(true)

    const classes = classNames('auc-ul', {
        [`auc-${size}`]: size,
        'is-open': showData?.length
    })

    useEffect(()=>{
        if( valueDebounce && isnetwork.current && valueDebounce[0] === '@' ){
            const finallyData = valueDebounce.slice( 1 )
            if( data ) { // 如果传了data而不是异步请求则优先使用data数据
                setShowData( data.filter(item=>{
                  if( !finallyData ) return true
                  return item.label?.includes( finallyData ) || item.value?.includes( finallyData )
                }) )
                return 
            }

            setLoading( true )
            const resultPromise= fetchSuggestions && fetchSuggestions( finallyData )
            if( resultPromise instanceof Promise ){
                resultPromise?.then(
                    data => {
                        setLoading( false );
                        setShowData( data )
                    },
                )
            }
        }    
    },[ valueDebounce, fetchSuggestions, data ])


    const renderTemplate = ( item: DataSourceType )=>{
        console.log(item)
        // 每项可自由定制
        return renderOption? renderOption( item ): item?.label || item.value || undefined
    }

    const handleshow = ( e: React.FocusEvent< HTMLElement, Element > )=>{
        setInputValue( '' )
        setShowData( [] )
        setHightlightInit()
        isnetwork.current = false
 
    }
    const handleSelect=( item: DataSourceType )=>{
        setTimeout(()=>{
            setInputValue( item?.label || item.value )
            setShowData( [] )
            setHightlightInit()
            isnetwork.current = false
        })
        if( onSelect ){
            onSelect( item )
        }
    }

    const handleKeyDown=( e: KeyboardEvent< HTMLElement > ) => {
        switch( e.code ){
            case 'Enter':
                if( showData && showData[ hightlightIndex ] ){
                    handleSelect( showData[ hightlightIndex ] )
                }
                break;
            case 'Escape':
                setInputValue(''); setShowData([])
                break;
            default:
                setKeyCode( e.code )
        }
    }
    return (
        <div className = "coder_dingjunjie" >
            <Input
                onKeyDown={( e ) => { handleKeyDown( e ) }}
                value={ inputValue }
                onBlur={( e ) => { handleshow( e ) }}
                onChange={( e: ChangeEvent< HTMLInputElement > )=>{ isnetwork.current = true; setInputValue( e.target.value.trim() ) }}
                size={size}
                { ...reseProps }
            />
            { loading &&
            <div className="suggstions-loading-icon">
              <Icon icon="LoadingOutlined" />
            </div>
            }
            <ul className={ classes } >
            {
                showData?.map(( item, index )=>{
                    const cnames = classNames( 'showdata-item', {
                        'item-hightlighted': index === hightlightIndex
                    })

                    return (
                        <li key={ index } className={ cnames } onMouseDown={()=>{ handleSelect( item ) }}>
                            { renderTemplate( item ) }
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
}
export default MentionsInput