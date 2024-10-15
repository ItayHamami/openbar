import React from 'react'
import ReactLoading from 'react-loading';


const LoadingSign = ({type , color}) => {
return (<>
<div className='d-flex justify-content-center align-items-center'>
    
    <ReactLoading type='spinningBubbles' height={'20%'} width={'20%'}/>
</div>

</>
)
}

export default LoadingSign
