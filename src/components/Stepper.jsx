import React, { useEffect, useState } from 'react'

const Stepper = ({checkoutSteps, currentStep, setCurrentStep}) => {


    const [margins, setMargins] = useState({
        marginLeft: 10,
        marginRight: 10
    })
    const [progressRef, setProgressRef] = useState([])

    const calcProgressBarWidth = () =>{
        const beg = checkoutSteps.length > currentStep - 1? currentStep-1: checkoutSteps.length-1
        return (beg / (checkoutSteps.length-1)) * 100
    }

    // useEffect(()=>{

    //     const getMargins = () =>{
    //         setMargins({
    //             marginLeft: progressRef.current[0].offsetWidth/2,
    //             marginRight: progressRef.current[checkoutSteps?.length-2].offsetWidth/2
    //         })
    //     }

    //     getMargins()

    // }, [progressRef, checkoutSteps.length])

  return (
    <div className="stepper-container">
        {
            checkoutSteps?.map((step, i)=>{
                return  <div 
                            className='step' 
                            onClick={()=>{
                                if(currentStep >= (i+1))
                                    setCurrentStep(i+1)
                                }}
                                key={i}
                        >
                            <div className={`step-number ${currentStep === i+1? 'active': currentStep > i+1?'complete': ''}`}>
                                {currentStep > i+1?<span>&#10004;</span>: <span>{step.icon}</span>}
                            </div>
                            <div>{step.name}</div>
                        </div>
            })
        }
        <div className="progress-bar">
            <div className="progress" style={{width: `${calcProgressBarWidth()}%`}}></div>
        </div>
    </div>
  )
}

export default Stepper