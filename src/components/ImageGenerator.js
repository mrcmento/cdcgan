import * as tf from '@tensorflow/tfjs';

class ImageGenerator {

    constructor(onModelLoaded) {
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

    generateImage(imageClass) {
        const latent_dim = 100
        const n_samples = 1
        //const n_classes=12

        const x_input = tf.tensor2d([this.randn_bm(latent_dim * n_samples)])
        const z_input = x_input//x_input.reshape(n_samples, latent_dim)
        const labels = tf.tensor1d([imageClass]) //tf.randint(0, n_classes, n_samples)
        const raw = this.model.predict([z_input, labels])
        const dataSync = Array.from(raw.dataSync())
        let data = []

        // load segmentation colors into format required for images
        for (var i = 0; i < dataSync.length; i++) {
            const pixel = ((dataSync[i] + 1) / 2.0) * 255.0
            data.push(pixel) // red
            data.push(pixel) // green
            data.push(pixel) // blue
            data.push(255) // alpha
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
}

export default ImageGenerator