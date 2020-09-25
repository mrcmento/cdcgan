import logging

import os
import azure.functions as func
import tensorflow as tf

import json
import numpy as np
from numpy import asarray
from numpy.random import randn
from numpy.random import randint
from tensorflow.keras.models import load_model

from numpy import expand_dims
from numpy import zeros
from numpy import ones

def generate_latent_points(latent_dim, label):
    # generate points in the latent space
    x_input = randn(latent_dim)
    # reshape into a batch of inputs for the network
    z_input = x_input.reshape(1, latent_dim)
    # generate labels
    labels = np.array([label])
    return [z_input, labels]

def main(req: func.HttpRequest) -> func.HttpResponse:

    imageclass = req.params.get('imageclass')
    if imageclass is None:
        return func.HttpResponse(
             "imageclass parameter requiered",
             status_code=400
        )
    imageclass = int(imageclass)
    
    with tf.device('/CPU:0'):
        model = load_model('./shoegan/cgan_generator.h5')

        latent_points, labels = generate_latent_points(100, imageclass)
        X  = model.predict([latent_points, labels])
        X = (X + 1) / 2.0
        X = X * 255 + 0.5

        grayscale = X.astype(int)

    return func.HttpResponse(
            json.dumps(grayscale.tolist()[0]),
            status_code=200
    )
