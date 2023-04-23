import React from 'react'
import { ReactComponent as SpinnerIcon } from '../media/icons/spinner.svg'

export const LoadingPage = () => {
    return (
        <div style={{
            position: 'relative',
            minHeight: 'inherit',
            height: 'inherit'
        }}>
            <div style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <SpinnerIcon style={{
                    display: 'block',
                    height: '3rem',
                    width: '3rem'
                }} />
            </div>
        </div>
    )
}