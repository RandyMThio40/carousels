import React, {useState,useRef,useEffect, Children} from 'react';
import './carousel.css';

export const Carousel1 = ({children}) => {
    const left_button = useRef();
    const right_button = useRef();
    const carousel = useRef();
    const carousel_wrapper = useRef();
    const [counter,setCounter] = useState(0);
    const direction  = useRef("row");
    const transition_time = useRef();


    const OPERATOR = {
        DECREMENT:"decrement",
        INCREMENT:"increment"
    }

    const DIRECTIONS = {
        RIGHT: "row-reverse",
        LEFT: "row"
    }

    const Counter = (operation) => {
        switch(operation){
            case OPERATOR.INCREMENT: {
                setCounter(prevCount => {
                    if(prevCount + 1 > (carousel_wrapper.current.childNodes.length - 1)) {
                        return 0;
                    }  
                    return ++prevCount
                })
                break
            }
            case OPERATOR.DECREMENT: {
                setCounter(prevCount => {
                    if(prevCount - 1 < 0){
                        return (carousel_wrapper.current.childNodes.length - 1);
                    }
                    return --prevCount;
                })
                break;
            }
            default:{
                break;
            }
        }

    }

    const handleLeftClick = (e) => {
        Counter(OPERATOR.DECREMENT);
        carousel_wrapper.current.style.transitionDuration = "0ms";
        let quotient = carousel_wrapper.current.getBoundingClientRect().width / carousel_wrapper.current.childNodes.length;
        carousel_wrapper.current.style.transform = `translate(-${quotient}px)`;
        if(direction.current === DIRECTIONS.RIGHT){
            direction.current = DIRECTIONS.LEFT;
            carousel.current.style.flexDirection = DIRECTIONS.LEFT;
            let fragment = document.createDocumentFragment();
            for(let i = 2; i < carousel_wrapper.current.childNodes.length;){
                fragment.appendChild(carousel_wrapper.current.lastChild)
            }
            carousel_wrapper.current.insertBefore(carousel_wrapper.current.childNodes[1], carousel_wrapper.current.firstChild);
            carousel_wrapper.current.appendChild(fragment, carousel_wrapper.current.childNodes[1]);
        }
        else{
            carousel_wrapper.current.insertBefore(carousel_wrapper.current.lastChild, carousel_wrapper.current.firstChild);
        }
        setTimeout(()=>{
            carousel_wrapper.current.style.transitionDuration = transition_time.current;
            carousel_wrapper.current.style.transform = `translate(${0}px)`;
        })
    }

    const handleRightClick = (e) => {
        Counter(OPERATOR.INCREMENT);
        console.log(document.documentElement.style.getPropertyValue("--carousel-transition-ms"));

        carousel_wrapper.current.style.transitionDuration = "0ms";
        let quotient = carousel_wrapper.current.getBoundingClientRect().width / carousel_wrapper.current.childNodes.length;
        carousel_wrapper.current.style.transform = `translate(${quotient}px)`;
        if(direction.current === DIRECTIONS.LEFT){
            direction.current = DIRECTIONS.RIGHT;
            carousel.current.style.flexDirection = DIRECTIONS.RIGHT;
            let fragment = document.createDocumentFragment();
            for(let i = 2; i < carousel_wrapper.current.childNodes.length;){
                fragment.appendChild(carousel_wrapper.current.lastChild)
            }
            carousel_wrapper.current.insertBefore(carousel_wrapper.current.childNodes[1], carousel_wrapper.current.firstChild);
            carousel_wrapper.current.appendChild(fragment, carousel_wrapper.current.childNodes[1]);
        }
        else{
            carousel_wrapper.current.insertBefore(carousel_wrapper.current.lastChild, carousel_wrapper.current.firstChild);
        }
        setTimeout(()=>{
            carousel_wrapper.current.style.transitionDuration = transition_time.current;
            carousel_wrapper.current.style.transform = `translate(${0}px)`;
        })
    }

    const handleTransitionEnd = (e) => {
        if(direction.current === DIRECTIONS.RIGHT){
            
        }
    }
    
    useEffect(()=>{
        carousel.current.style.width = `${carousel_wrapper.current.childNodes[0].getBoundingClientRect().width}px`;
        document.documentElement.style.setProperty('--carousel-transition-ms',"400ms");
        transition_time.current = document.documentElement.style.getPropertyValue('--carousel-transition-ms');
        console.log(React.Children.toArray(children));

    },[])

    return(
        <div ref={carousel} className="carousel"> 
            <div ref={carousel_wrapper} className="carousel-wrapper" onTransitionEnd={handleTransitionEnd}> 
                {children}
            </div>
            <button ref={left_button} className="carousel-button left" onClick={handleLeftClick}>&#8656;</button>
            <button ref={right_button} className="carousel-button right" onClick={handleRightClick}>&#8656;</button>
        </div>
    )
}



export const Carousel2 = ({children , visible}) => {
    const left_button = useRef();
    const right_button = useRef();
    const carousel = useRef();
    const carousel_wrapper = useRef();
    const counter = useRef(Array.from(new Array((visible <= (children.length-2))? visible : (children.length-2)).keys()));
    const transition_time = useRef();
    
    
    const OPERATOR = {
        DECREMENT:"decrement",
        INCREMENT:"increment"
    }

    
    const set_style = ( element,leftValue = 0, opacityValue = 0, zIndexValue = 0, transformValue = '') => {
        element.style.left = `${leftValue}%`;
        element.style.opacity = opacityValue;
        element.style.zIndex = zIndexValue;
        element.style.transform = transformValue;
    }

    const Counter = (operation) => {
        switch(operation){
            case OPERATOR.INCREMENT: {
                counter.current = counter.current.map(num=>{
                    return ++num % children.length;
                })
                console.log(counter.current)
                break
            }
            case OPERATOR.DECREMENT: {
                counter.current = counter.current.map(num=>{
                    if((num - 1) < 0) return children.length-1;
                    return --num;
                })
                console.log(counter.current)
                break;
            }
            default:{
                break;
            }
        }
    }

    const handleLeftClick = () => {
        counter.current.forEach((index,idx)=>{
            if(idx === (counter.current.length-1)){
                carousel_wrapper.current.childNodes[(index+1)%children.length].style.transitionDuration = '0ms';
                set_style(carousel_wrapper.current.childNodes[(index+1)%children.length],0,0,0,`translateX(-100%)`)
                setTimeout(()=>{
                    carousel_wrapper.current.childNodes[(index+1)%children.length].style.transitionDuration = '';
                })
                set_style(carousel_wrapper.current.childNodes[index],100)
                return
            }
            set_style(carousel_wrapper.current.childNodes[index])
        })
        Counter(OPERATOR.DECREMENT);
        counter.current.forEach((index,idx)=>{
            let center = Math.ceil(counter.current.length / 2);
            let z_pos = ( (idx+1) > center) ? ( center - (idx+1 - center)) : idx+1;
            let left_val = (idx+1)*(100/(counter.current.length+1));
            set_style(carousel_wrapper.current.childNodes[index],left_val,1,z_pos)
        })
        
    }

    const handleRightClick = () => {
        counter.current.forEach((index,idx)=>{
            if(idx === (counter.current.length-1)){
                carousel_wrapper.current.childNodes[(index+2)%children.length].style.transitionDuration = '0ms';
                set_style(carousel_wrapper.current.childNodes[(index+2)%children.length],100,0,0)
                setTimeout(()=>{
                    carousel_wrapper.current.childNodes[(index+2)%children.length].style.transitionDuration = '';
                })
            }   
            set_style(carousel_wrapper.current.childNodes[index])
        })
        Counter(OPERATOR.INCREMENT);
        counter.current.forEach((index,idx)=>{
            let center = Math.ceil(counter.current.length / 2);
            let z_pos = ( (idx+1) > center) ? ( center - (idx+1 - center)) : idx+1;
            let left_val = (idx+1)*(100/(counter.current.length+1));
            set_style(carousel_wrapper.current.childNodes[index],left_val,1,z_pos)
        })

    }
    
    useEffect(()=>{
        carousel.current.style.height = `${carousel_wrapper.current.childNodes[0].getBoundingClientRect().height}px`
        console.log(React.Children.toArray(children));
    },[])

    return(
        <div ref={carousel} className="carousel second"> 
            <div ref={carousel_wrapper} className="carousel-wrapper"> 
                {React.Children.toArray(children).map((child,idx) => {
                    let index = (idx < counter.current.length) ? idx+1 : 0;
                    let center = Math.ceil(counter.current.length / 2);
                    let z_pos = (index && index > center) ? ( center - (index - center)) : index;
                    let styleSheet = {
                        left:`${index /(counter.current.length+1) * 100}%`,
                        opacity:index ? 1 : 0,
                        zIndex:z_pos,
                        transform: (!index) ? `translateX(-${100}%)` : '',
                    }
                    if(idx === counter.current.length) styleSheet.left = "100%";
                    return React.cloneElement(child,{className:`${child.props.className ? `${child.props.className} ` : ``}slide`,style: styleSheet },<>{child.props.children}</>)
                })}
            </div>
            <button ref={left_button} className="carousel-button left" onClick={handleLeftClick}>&#8656;</button>
            <button ref={right_button} className="carousel-button right" onClick={handleRightClick}>&#8656;</button>
        </div>
    )
}

export const Carousel3 = ({children,visible = 1}) => {
    const left_button = useRef();
    const right_button = useRef();
    const carousel = useRef();
    const carousel_wrapper = useRef();
    const index = useRef(0);

    const handleLeftClick = () => {
        index.current = ((index.current-1) < 0) ? carousel_wrapper.current.childNodes.length : index.current-1 ;
        let distance = index.current / carousel_wrapper.current.childNodes.length;
        /* when user reaches the first element and wants to continue viewing leftwards
        calculate distance for window displaying items to be pushed */
        if( index.current === carousel_wrapper.current.childNodes.length ) {
            // finds the distance for the window displaying items to end
            let remaining_distance = (carousel_wrapper.current.offsetWidth - carousel.current.offsetWidth)/carousel_wrapper.current.offsetWidth;
            // quantity of evenly divided pieces
            let quantity = remaining_distance / ((carousel_wrapper.current.offsetWidth/carousel_wrapper.current.childNodes.length)/carousel_wrapper.current.offsetWidth)
            distance = remaining_distance;
            // finds the next index so the next time the user clicks the window will stop at next closest item even if it is clipping
            index.current = (`${quantity.toFixed(1)}`.split(".")[1][0] < 2) ? Math.floor(quantity) : Math.ceil(quantity);
        }
        carousel_wrapper.current.style.transform = `translate(-${ distance * 100 }%)`;
    }
    
    const handleRightClick = () => {
        let distance = (index.current + 1) / carousel_wrapper.current.childNodes.length;
        let remaining_distance = (carousel_wrapper.current.offsetWidth - carousel.current.offsetWidth)/carousel_wrapper.current.offsetWidth;
        if(distance > remaining_distance){
            let quantity = remaining_distance / ((carousel_wrapper.current.offsetWidth/carousel_wrapper.current.childNodes.length)/carousel_wrapper.current.offsetWidth)
            let new_index = (`${quantity.toFixed(1)}`.split(".")[1][0] < 2) ? Math.floor(quantity) : Math.ceil(quantity);
            console.log(index.current,new_index);
            let same_index = index.current === new_index;
            index.current = (same_index) ? 0 : new_index;
            distance = (same_index) ? 0 : remaining_distance;
        }
        else{
            index.current = index.current + 1;
        }
        carousel_wrapper.current.style.transform = `translate(-${ distance * 100 }%)`;
    }

    useEffect(()=>{
        if(visible > Children.toArray(children).length || visible <= 0 ){ visible = Children.toArray(children).length }
        if(visible){
            carousel.current.style.width = `${(carousel_wrapper.current.childNodes[0].getBoundingClientRect().width + (parseFloat(window.getComputedStyle(carousel_wrapper.current.childNodes[0]).getPropertyValue("margin-left")) << 1 )) * visible }px`;
        }
    },[visible])

    return(
         <div ref={carousel} className="carousel third" style={{width:``}}> 
            <div ref={carousel_wrapper} className="carousel-wrapper">  
                {React.Children.toArray(children).map((child,idx) => {
                    return React.cloneElement(child,null,<>{child.props.children}</>)
                })}
            </div>
            <button ref={left_button} className="carousel-button left" onClick={handleLeftClick}>&#8656;</button>
            <button ref={right_button} className="carousel-button right" onClick={handleRightClick}>&#8656;</button>
        </div>
    )
}


export default Carousel1;