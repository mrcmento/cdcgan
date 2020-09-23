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
            loading: true
        }
    }

    render() {
        return(
            <div className="box">
                <h1 className="main-title">Footwear designed by artificial intelligence</h1>
                <DropDown currentClass ={this.state.imageClass} handleChange={(imageClass) => this.updateClass(imageClass)}></DropDown>
                <CarouselComponent loading = {this.state.loading} content={this.state.images} handleClick={this.handleClick}></CarouselComponent>
            </div>
            )
        }

    componentDidMount() {
        this.imageGenerator = new ImageGenerator(() => {
                this.setState({images: []}, 
                    () => this.setState({imageClass: 11}, 
                        () => this.genInitialPics(this.state.imageClass))
                )
            }
        )
    }

    genInitialPics() {
        this.setState({loading: true}, () => {
            let images = []
            for(let i = 0; i<this.nInitialPics; i++){
                images.push(this.imageGenerator.generateImage(this.state.imageClass))
            }
            this.setState({images}, () => { setTimeout( () => this.setState({loading: false}), 750)})
        })
    }


    genIfNeeded(pos){
        if(pos+1 === this.state.images.length){
            this.setState({images: [...this.state.images, this.imageGenerator.generateImage(this.state.imageClass)]})
            
        }
    }

    updateClass(imageClass) {
        if(imageClass != this.state.imageClass) {
            this.setState({imageClass: imageClass}, () => this.genInitialPics())
        }
    }
}

export default Home