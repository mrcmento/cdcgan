import React from 'react'
import DropDown from './dropdown';
import Loader from 'react-loader-spinner';
import ImageGenerator from './ImageGenerator'
import CarouselComponent from "./carousel.component";

class Home extends React.Component {

    constructor() {
        super()
        this.handleClick = this.genIfNeeded.bind(this);
        this.updateClass = this.updateClass.bind(this)
        this.imageGenerator = null

        this.nInitialPics = 4
        this.state = {
            images: [],
            imageClass: 0,
            loading: true,
            isLocalAI: true
        }
    }
 
    render() {
        
        return(
            <div>
                <h1>AI generated Footwear</h1>
                <DropDown currentClass ={this.state.imageClass} handleChange={(imageClass) => this.updateClass(imageClass)}></DropDown>
                {this.state.loading ?
                    <div style={{paddingTop: "3rem"}}>
                        <Loader type="Rings" color="#2BAD60" /> 
                        <p style={{textAlign: "center", color: "#2BAD60", paddingTop: "1rem"}}>
                            {!this.state.isLocalAI ? 'Waiting for serverless cloud AI' : 'Trying to use local image generator'}
                        </p>
                    </div>
                :<div>
                    <CarouselComponent content={this.state.images} handleClick={this.handleClick}></CarouselComponent>
                    <h2>unique shoes only</h2>
                </div> }
  
            </div>
            )
        }

    componentDidMount() {
        const onReady = () => {
            this.setState({images: []}, 
                () => this.genInitialPics(this.state.imageClass) 
            )
        }
        this.imageGenerator = new ImageGenerator(onReady, (isLocalAI) => this.setState({isLocalAI: isLocalAI}))
    }

    genInitialPics() {
        this.setState({loading: true}, async () => {
            let parallelCalls = []
            for(let i = 0; i<this.nInitialPics; i++){
                parallelCalls.push(this.imageGenerator.getNext(this.state.imageClass))
            }
            const images = await Promise.all(parallelCalls)
            this.setState({images}, () => { this.setState({loading: false})})
        })
    }

    async genIfNeeded(pos){
        if(pos+1 === this.state.images.length){
            const nextImage = await this.imageGenerator.getNext(this.state.imageClass)
            this.setState({images: [...this.state.images, nextImage]})
        }
    }

    updateClass(imageClass) {
        if(imageClass !== this.state.imageClass) {
            this.setState({imageClass}, () => this.genInitialPics())
        }
    }
}

export default Home