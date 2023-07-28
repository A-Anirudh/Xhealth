import asyncHandler from  "express-async-handler"


const getAllHealthRecords=asyncHandler(async (req,res)=>{});

const newHealthRecord=asyncHandler(async (req,res)=>{});

const getHealthRecordSpecific=asyncHandler(async (req,res)=>{});

export {getHealthRecordSpecific,getAllHealthRecords,newHealthRecord};

