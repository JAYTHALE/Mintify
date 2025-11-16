import React from 'react'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return <>
        <div role="alert" className='container mt-4'>
            <div className='alert alert-danger'>
                <h2>Something went wrong.</h2>
                <p>{error.message}.</p>
                <button className='btn btn-sm btn-dark' type='button' onClick={resetErrorBoundary}>Try again</button>
            </div>
        </div>
    </>
}

export default ErrorFallback