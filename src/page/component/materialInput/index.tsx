import classNames from 'classnames';
import React, { ChangeEventHandler, FC } from 'react';
import './index.less';

type ISize = 'large' | 'middle' | 'small' | 'mini'

interface IMaterialInput {
    size?: ISize,
    block?: boolean,
    value?: string,
    onChange?: ( value: string ) => void,
    field: string,
    type?: string,
    label? :string
}

const MaterialInput: FC<IMaterialInput> = ( props ) => {
    const { field, label, type = 'text', size, block, value = '', onChange,  ...resetProps } = props

    const classs = classNames('form-item', {
        [`materialInput_${size}`]: size,
        'block': block,
    })

    const _onChange:ChangeEventHandler<HTMLInputElement> = ( e ) => {
        onChange && onChange( e.target.value )
    }
    return (
      <div className={ classs }>
        <input 
            type={ type }
            value={value} 
            onChange={_onChange}
            required 
            id={ field }
            {...resetProps} 
        />
        
        <span className='bar' ></span>

        <label htmlFor={ field }>
            {label ?? field}
        </label>
      </div>
    )
}
export default MaterialInput;
