import asyncHandler from "express-async-handler";
import personalHealth from '../models/personalHealthModel.js'

/**
 * @desc : Add a new health metric
 * @access : Private
 * @route : POST to /api/users/metrics
 * @params : heartRate, bloodPressure, glucose, weight, height, bmi
 */

const addMetrics = asyncHandler(async (req, res) => {
    const { heartRate, bloodPressure, glucose, weight, height, bmi } = req.body;

    const healthMetric = await personalHealth.create({
        userId:req.user._id, heartRate, bloodPressure, glucose, weight, height, bmi
    })

    res.status(200).json({
        "Message":"Metrics added successfully",
        metrics:{
            heartRate,bloodPressure, glucose,weight,height,bmi
        }
    })
});

/**
 * @desc : View all my healthMetrics
 * @access : PRIVATE
 * @route : GET to /api/users/metrics
*/

const getAllMyMetrics = asyncHandler(async (req, res) => {
    const myMetrics = await personalHealth.find({userId:req.user._id});

    if(myMetrics) {
        res.status(200).json(myMetrics)
    } else {
        res.status(res.statusCode === 200 ? 500 : res.statusCode);
        // Preserve existing status code if it's not an HTTP error
        throw new Error("Could not find data for the specified user!");
    }
    
});

/**
 * @desc : Delete health metric
 * @access : PRIVATE
 * @route : DELETE to /api/users/metrics
 * @params : _id - ID of the metric to delete
 */


const deletePersonalHealthMetric = asyncHandler(async (req,res)=>{
    const {_id} = req.body;
    const metric = await personalHealth.findByIdAndDelete(_id);

    if(metric) {
        res.status(200).json({metric})
    } else {
        res.status(res.statusCode === 200 ? 500 : res.statusCode);
        throw new Error("Metric not found to delete")
    }
})

export {getAllMyMetrics,addMetrics,deletePersonalHealthMetric};
