import * as tf from '@tensorflow/tfjs';

class ImageGenerator {

    constructor(onModelLoaded, onAITypeChanged) {
        this.isLocalAI = false
        this.url = '/api/shoegan?imageclass='
        this.onAITypeChanged = onAITypeChanged

        new Promise( async () => {
            this.model = await tf.loadLayersModel('jsmodel/model.json');
            onModelLoaded()
            }
        )
    }

    randn_bm(samples) {
        let nums = []
        for(let i = 0; i<samples; i++) {
            var u = 0, v = 0;
            while(u === 0) u = Math.random();
            while(v === 0) v = Math.random();
            nums.push(Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v ))
        }
        return nums
    }

    async generateImage(imageClass) {
        let data = []
        
        if(this.isLocalAI) {
            try {
                const latent_dim = 100
                const n_samples = 1
                const x_input = tf.tensor2d([this.randn_bm(latent_dim * n_samples)])
                const z_input = x_input//x_input.reshape(n_samples, latent_dim)
                const labels = tf.tensor1d([imageClass]) //tf.randint(0, n_classes, n_samples)

                //if gen takes too long like on old pcs...
                let didThisInTime = false
                setTimeout(() => { 
                        if(!didThisInTime) {
                            this.setLocalAI(false)
                            throw 'timeout'
                        }
                    } ,500)
                const raw = this.model.predict([z_input, labels])
                didThisInTime = true

                const dataSync = Array.from(raw.dataSync())

                for (var i = 0; i < dataSync.length; i++) {
                    const pixel = ((dataSync[i] + 1) / 2.0) * 255.0
                    data.push(pixel) // red
                    data.push(pixel) // green
                    data.push(pixel) // blue
                    data.push(255) // alpha
                }
            } catch {
                this.setLocalAI(false)
            }
        } else {
            const imageContent = await (await fetch(this.url + imageClass, {mdethod: 'GET', mode: 'cors'})).json()
            for(let i = 0; i<112; i++) {
                for(let j = 0; j<112; j++) {
                    const pixel = imageContent[i][j] * 255
                    data.push(pixel) // red
                    data.push(pixel) // green
                    data.push(pixel) // blue
                    data.push(255)   // alpha
                }
            }
        }
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = 112
        canvas.height = 112
        
        let imageData = new ImageData(112, 112)
        imageData.data.set(data)
    
        context.putImageData(imageData,0,0);
        return canvas.toDataURL()
    }

    setLocalAI(isLocalAI) {
        this.isLocalAI = isLocalAI
        this.onAITypeChanged(this.isLocalAI)
    }
}

export default ImageGenerator