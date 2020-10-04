import config from '../config'
import randn_bm from './randn_bm'
import * as tf from '@tensorflow/tfjs';
import fetchWithTimeout from './fetchWithTimeout'

class ImageGenerator {

    constructor(onGeneratorReady, onAITypeChanged) {
        this.isLocalAI = true
        this.onAITypeChanged = onAITypeChanged
        this.url = config.shoeGanUrl
        this.init(onGeneratorReady)
    }

    init(onGeneratorReady) {
        new Promise(async () => {
            this.model = await tf.loadLayersModel('jsmodel/model.json');

            this.setLocalAI(await this.checkLocalAIWorksOnDevice())

            if(!this.isLocalAI){
                await this.waitForFunctionHostColdStart()
            }
            onGeneratorReady()
        })
    }

    async waitForFunctionHostColdStart() {
        while(true) {
            try {
                await fetchWithTimeout(config.shoeGanUrl + '0', {mdethod: 'GET'}) // later ping
                break //got any response. Function Host booted
            }
            catch{}
        }
    }

    setLocalAI(isLocalAI) {
        this.isLocalAI = isLocalAI
        this.onAITypeChanged(this.isLocalAI)
    }

    async checkLocalAIWorksOnDevice() {
        const tryGenerator = new Promise(async (resolve, reject) => {
            const testImage = await this.generateImageInBrowser(0) //try to generate image locally...
            resolve(testImage.length !== 0)
        });
          
        const generationTimeout = new Promise((resolve, reject) => {
            setTimeout(() => resolve(false), 1500);
        });

        return await Promise.race([tryGenerator, generationTimeout])
    }

    async generateImageInBrowser(imageClass) {
        let buffer = []
        try {
            const latent_dim = 100
            const n_samples = 1
            const x_input = tf.tensor2d([randn_bm(latent_dim * n_samples)])
            const z_input = x_input//x_input.reshape(n_samples, latent_dim)
            const labels = tf.tensor1d([imageClass]) //tf.randint(0, n_classes, n_samples)

            const raw = this.model.predict([z_input, labels])
            const dataSync = Array.from(raw.dataSync())

            for (var i = 0; i < dataSync.length; i++) {
                const pixel = ((dataSync[i] + 1) / 2.0) * 255.0
                buffer.push(pixel) // red
                buffer.push(pixel) // green
                buffer.push(pixel) // blue
                buffer.push(255) // alpha
            }
        } catch {
            this.setLocalAI(false)
        }
        return buffer
    }

    async generateImageInCloud(imageClass) {
        let buffer = []
        try{
            var response = await fetch(config.shoeGanUrl + imageClass, {mdethod: 'GET'})
            var imageContent = await response.json()
        } catch (ex){
            console.log(ex)
            return []
        }

        for(let i = 0; i<112; i++) {
            for(let j = 0; j<112; j++) {
                const pixel = imageContent[i][j]
                buffer.push(pixel) // red
                buffer.push(pixel) // green
                buffer.push(pixel) // blue
                buffer.push(255)   // alpha
            }
        }
        return buffer
    }

    //delegation wrapper for generation
    async delegateImageGeneration(imageClass) {
        if(this.isLocalAI)
            return await this.generateImageInBrowser(imageClass)

        return await this.generateImageInCloud(imageClass)
    }

    async getNext(imageClass) {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = 112
        canvas.height = 112
        
        const imageData = new ImageData(112, 112)
        imageData.data.set(await this.delegateImageGeneration(imageClass))
    
        context.putImageData(imageData,0,0);
        return canvas.toDataURL()
    }
}

export default ImageGenerator