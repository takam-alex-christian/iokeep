import React from 'react'


export default class Home extends React.Component{

    constructor(props){
        super(props)

        this.topRef = React.createRef();
        this.bottomRef = React.createRef();
    }

    componentDidMount(props){
        console.log(`top: ${this.topRef.current.getBoundingClientRect().top}`)
        console.log(`bottom: ${this.bottomRef.current.offsetTop}`)
    }


    render(){
        return(
            <div className={`h-screen w-full bg-red-500`}>
                <p ref={this.topRef} className={`p-4`}>
                    the world is a strange place
                </p>
                <div ref={this.bottomRef} className='flex flex-col h-full bg-yellow-400'>
sdf
                </div>
            </div>
        )
    }
}