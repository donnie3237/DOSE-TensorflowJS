import React from 'react'
import './my.css'
import * as tf from '@tensorflow/tfjs'




function MyModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({units:1,inputShape:[1]}))
    model.compile({loss:'maenSquareError',optimizer:'sgd'})
    model.summary()
    const xs= tf.tensor2d([-1.0,0.0,1.0,2.0,3.0,4.0],[6,1])
    const ys= tf.tensor2d([-3.0,-1.0,2.0,3.0,5.0,7.0],[6,1])
    async function doTraining(){
            model.fit(xs,ys,{
            epochs:500,
            callbacks:{
                onEpochEnd:async(epoch,logs)=>{
                    console.log(
                        "Epoch:"+epoch+"loss:"
                    )
                }
            }
        })
    }   
    doTraining(model).then(()=>{
        alert(model.predict(tf.tensor2d([10],[1,1])))
    })

  return (
    <div className="my">
        <p>eiei</p>
    </div>
  )
}

export default MyModel