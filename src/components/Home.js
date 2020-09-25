import React from 'react'

import CarouselComponent from "./carousel.component";
import DropDown from './dropdown';
import ImageGenerator from './ImageGenerator'

class Home extends React.Component {

    constructor() {
        super()
        this.handleClick = this.genIfNeeded.bind(this);
        this.updateClass = this.updateClass.bind(this)
        this.imageGenerator = null

        this.nInitialPics = 4
        this.state = {
            images: [],
            imageClass: 11,
            loading: true,
            isLocalAI: true
        }
    }

    render() {
        return(
            <div>
                <h1 style={{textDecoration: "underline"}}>Footwear designed by<br/>artificial intelligence</h1>

                <DropDown currentClass ={this.state.imageClass} handleChange={(imageClass) => this.updateClass(imageClass)}></DropDown>
                <CarouselComponent loading = {this.state.loading} content={this.state.images} handleClick={this.handleClick}></CarouselComponent>
            </div>
            )
        }

    componentDidMount() {
        const onReady = () => {
            this.setState({images: []}, 
                () => this.setState({imageClass: 11}, 
                    () => this.genInitialPics(this.state.imageClass))
            )
        }
        this.imageGenerator = new ImageGenerator(onReady,(isLocalAI) => this.setState({isLocalAI: isLocalAI}))
    }

    genInitialPics() {
        this.setState({loading: true}, async () => {
            let images = []
            for(let i = 0; i<this.nInitialPics; i++){
                images.push(await this.imageGenerator.generateImage(this.state.imageClass))
            }
            this.setState({images}, () => { this.setState({loading: false})})
        })
    }


    async genIfNeeded(pos){
        if(pos+1 === this.state.images.length){
            const nextImage = await this.imageGenerator.generateImage(this.state.imageClass)
            this.setState({images: [...this.state.images, nextImage]})
        }
    }

    updateClass(imageClass) {
        if(imageClass != this.state.imageClass) {
            this.setState({imageClass: imageClass}, () => this.genInitialPics())
        }
    }
}

export default Home