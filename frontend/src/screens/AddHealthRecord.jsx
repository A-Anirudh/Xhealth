import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Users } from '../sdk/users';
import { useAddHealthRecordMutation, useGetHealthRecordsMutation } from '../slices/healthRecordSlice';
import { Box, Button, Grid, Input, TextField, Typography } from '@mui/material';
import { format } from 'date-fns';


export const AddHealthRecord = () => {
  const patientEmail = useSelector(state => state.patientId);
  const doctorMail=useSelector(state=>state.auth.doctorInfo.email)
  const user = new Users();

  // const [records] = useGetHealthRecordsMutation();
  const [addRecord] = useAddHealthRecordMutation()
  const [allRecords, setallRecords] = useState()

  

  const generateEmptyTimings = (count) => {
    return new Array(count).fill(''); // Initialize with empty arrays
  };


  //---------Dynamic input fields states-------
  const [problems, setproblems] = useState([""])
  const [allmeds, setallmeds] = useState([{ 'name': '', 'dosage': 0, 'perDay': 0, 'gap': 0, 'timings': [] }])
  const [timing, settiming] = useState([generateEmptyTimings(0)]);
  const [immu, setimmu] = useState([{ 'name': '', 'dosage': '' }])
  const [scans, setScans] = useState([{'name':'','pdfLink':'','typeOf':''}])
  //---------Dynamic input fields states-------

  const [newRecord, setnewRecord] = useState({  
    'email': patientEmail,
    'record': {
      'doctorId': 'docId',//get from the local storage

      'diagnosis': {
        'data': '',
        'problems': '',//assign to problem array
      },

      'medications': {
        'startDate': '',
        'endDate': '',
        'allMeds': [{}]//assign to medsArray
      },

      'immunizations': [],//assign of immunizationArray

      'scans': [{}]//assign to scansArray

    }

  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setnewRecord((prev) => {
        const prevValue = { ...prev };
        prevValue.name.data = value;
        return prevValue
      })
    }

    else { setnewRecord((prev) => { return { ...prev, [name]: value } }); }

    console.log(newRecord)
  }


  useEffect(() => {
    return async () => {
      await records({ email: patientEmail }).unwrap().then((data) => setallRecords(data))
    }
  }, [patientEmail])

  if ( !newRecord) return "loading"

  //-------Required Functions-----

  const handleOnSubmit=()=>{
    console.log("submitting", newRecord);
    const data=addRecord(newRecord)
    console.log('data added',data.unwrap())
  }


  const handleOtherChange=(e)=>{
    const{name,value}=e.target
    console.log("name",name,'value',value)
    if(name=='diagnosis'){
      setnewRecord({...newRecord,record:{...newRecord.record,diagnosis:{...newRecord.record.diagnosis,data:value}}})
    }
    else if(name=='startDate'){
      setnewRecord({...newRecord,record:{...newRecord.record,medications:{...newRecord.record.medications,startDate:value}}})
    }
    else if(name=='endDate'){
      setnewRecord({...newRecord,record:{...newRecord.record,medications:{...newRecord.record.medications,endDate:value}}})
    }
  }

  //----Dynamic problems----
  const addProblem = () => {
    setproblems([...problems, ""])
  }
  const handleProblemChange = (e, i) => {
    const value = e.target.value;
    setproblems((prev) => {
      const updatedProblems = [...prev];
      updatedProblems[i] = value;
      setnewRecord((prev) => {
        const prevValue = { ...prev };
        prevValue.record.diagnosis.problems = updatedProblems;
        return prevValue;
      });
      return updatedProblems;
    });
  };
  const handleProblemRemove = (i) => {
    const updatedProblems = [...problems];
    updatedProblems.splice(i, 1);

    setproblems(updatedProblems);

    setnewRecord((prev) => ({
      ...prev,
      record: {
        ...prev.record,
        diagnosis: {
          ...prev.record.diagnosis,
          problems: updatedProblems,
        },
      },
    }));
  };
  //----Dynamic problems----


  //----Dynamic Medicines----
  const addMedication = () => {
    setallmeds([...allmeds, { 'name': '', 'dosage': 0, 'perDay': 0, 'gap': 0, 'timings': [] }])
  }
  const handleRemoveMedication = (i) => {
    const updatedMedicine = [...allmeds]
    const updateTiming = [...timing]

    updatedMedicine.splice(i, 1)
    updateTiming.splice(i, 1)

    setallmeds(updatedMedicine)
    settiming(updateTiming)

  }
  const handleMedicationChange = (e, i) => {
    const prevRecord = { ...newRecord }
    const { name, value } = e.target;
    const updateValue = [...allmeds]
    updateValue[i][name] = value
    if (name == 'perDay') {
      const perDayValue = Number(value);
      updateValue[i][name] = perDayValue

      updateValue[i].timings = generateEmptyTimings(perDayValue);

      const updatedTiming = [...timing];
      updatedTiming[i] = generateEmptyTimings(perDayValue);
      settiming(updatedTiming);
      setallmeds(updateValue)

      prevRecord.record.medications.allMeds = allmeds
      setnewRecord(prevRecord)

      return
    }
    if (name == 'dosage' || name == 'gap') {
      const perDayValue = Number(value);
      updateValue[i][name] = perDayValue
      setallmeds(updateValue)
    }
    setallmeds(updateValue)
    prevRecord.record.medications.allMeds = allmeds
    setnewRecord(prevRecord)

  }
  const handleTimeChange = (e, i, j) => {
    //j is medicine index
    //i is timing index
    const { name, value } = e.target


    const prev = [...timing]
    prev[j][i] = value

    settiming(prev)


    const prevMed = [...allmeds]

    prevMed[j].timings = timing[j]
    setallmeds(prevMed)
    console.log("new allmeds", allmeds)

  }
  //----Dynamic Medicines----

  //----Dynamic immunization----
    const addImmunization=()=>{
      setimmu([...immu,{'name':'','dosage':''}])
    }
    const handleRemoveImmu=(i)=>{
      const updateImmu=[...immu]
      updateImmu.splice(i,1)
      setimmu(updateImmu)

      setnewRecord((prev) => ({
        ...prev,
        record: {
          ...prev.record,
          immunizations:updateImmu
        },
      }));
    }
    const handleImmuChange=(e,i)=>{
      const {name,value}=e.target
      if(name=='dosage'){
        setimmu((prev) => {
          const updatedImmu = [...prev];
          updatedImmu[i][name] =Number(value) ;
          setnewRecord((prev) => {
            const prevValue = { ...prev };
            prevValue.record.immunizations = updatedImmu;
            return prevValue;
          });
          return updatedImmu;
        });

      }
      else{setimmu((prev) => {
        const updatedImmu = [...prev];
        updatedImmu[i][name] =value ;
        setnewRecord((prev) => {
          const prevValue = { ...prev };
          prevValue.record.immunizations = updatedImmu;
          return prevValue;
        });
        return updatedImmu;
      });
    
      console.log(name,value)}
    }
    //----Dynamic immunization----


    //----Dynamic Scans----
    const addScans=()=>{
      setScans([...scans,{'name':'','pdfLink':'','typeOf':''}])
    }
    const handleRemoveScan=(i)=>{
      const updateScans=[...scans]
      updateScans.splice(i,1)
      setScans(updateScans)

      setnewRecord((prev) => ({
        ...prev,
        record: {
          ...prev.record,
          scans:updateScans
        },
      }));
    }
    const handleScanChange=(e,i)=>{
      const{name,value}=e.target
      const updateScans=[...scans]
      updateScans[i][name]=value

      
      setnewRecord({...newRecord,'record' : {...newRecord['record'], 'scans':updateScans}})
    }
    //----Dynamic Scans----










  //-------Required Functions-----
  // console.log('record', newRecord)
  return (
    <Grid>

      <Box backgroundColor='blue' color='white' className='title&button' display='flex' justifyContent='space-between' >
        <Typography variant='h3'>Add Patient Health Record </Typography>
        <Button sx={{ color: 'white' }} onClick={handleOnSubmit}>Add new Record</Button>
      </Box>

      <Box className='diagnosis' backgroundColor='green' display='flex' flexDirection='column'>
        <Box display='flex' width='100%' alignItems='center'>
          <Typography variant='h4'>Diagnosis</Typography>
          <Box width='100%' height="2px" backgroundColor='grey'></Box>
        </Box>
        <Box className='inputField' display='flex'>
          <Typography className='label'>Diagnosis</Typography>
          <TextField sx={{ backgroundColor: 'white' }} name='diagnosis' value={newRecord.record.diagnosis.data} onChange={(e)=>handleOtherChange(e)}></TextField>
        </Box>
      </Box>

      <Box className='problems' backgroundColor='maroon' display='flex' flexDirection='column'>
        <Box display='flex' width='100%' alignItems='center'>
          <Typography variant='h4'>Problems</Typography>
          <Box width='100%' height="2px" backgroundColor='grey'></Box>
        </Box>

        <Button sx={{ color: 'white', width: '5rem' }} onClick={addProblem}>Add</Button>

        <Box className='problemsHolder' display='flex' backgroundColor='gray'>
          {problems.map((val, i) =>
            <Box key={i} className='problemCard'>
              <Box className='inputField' display='flex' color='white'>
                <Typography className='label'>Problem</Typography>
                <TextField sx={{ backgroundColor: 'white' }} value={val} onChange={(e) => handleProblemChange(e, i)}></TextField>
                <Button onClick={handleProblemRemove}>Cancel</Button>
              </Box>
            </Box>
          )}

        </Box>
      </Box>

      <Box className='medicines' backgroundColor='maroon' display='flex' flexDirection='column'>
        <Box display='flex' width='100%' alignItems='center'>
          <Typography variant='h4'>Medicines</Typography>
          <Box width='100%' height="2px" backgroundColor='grey'></Box>
        </Box>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Box display={'flex'}>
            <Typography >Start Date</Typography >
            <Input type='date' disableUnderline name='startDate' value={newRecord.record.medications.startDate} onChange={(e)=>handleOtherChange(e)}></Input>
          </Box>
          <Box display={'flex'}>
            <Typography >End Date</Typography >
            <Input type='date' disableUnderline name='endDate' value={newRecord.record.medications.endDate} onChange={(e)=>handleOtherChange(e)}></Input>
          </Box>

        </Box>
        <Button sx={{ color: 'white', width: '5rem' }} onClick={addMedication}>Add</Button>
        <Box className='problemsHolder' display='flex' backgroundColor='gray'>
          {allmeds.map((value, j) => {
            const { name, dosage, perDay, gap, timings } = value;
            return (
              <Box key={j} className='problemCard' display='flex' flexDirection={'column'} backgroundColor='pink'>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                  <Typography className='label'>Medicine</Typography>
                  <Button onClick={() => handleRemoveMedication(j)}>Cancel</Button>
                </Box>
                <Box className='inputField' display='flex' color='white'>
                  <Typography className='label'>Name</Typography>
                  <TextField sx={{ backgroundColor: 'white', width: '100%' }} value={name} name='name' onChange={(e) => handleMedicationChange(e, j)}></TextField>
                </Box>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                  <Box className='inputField' display='flex' color='white'>
                    <Typography className='label'>Dosage</Typography>
                    <TextField sx={{ backgroundColor: 'white' }} value={dosage} name='dosage' onChange={(e) => handleMedicationChange(e, j)}></TextField>
                  </Box>
                  <Box className='inputField' display='flex' color='white'>
                    <Typography className='label'>Per day</Typography>
                    <TextField sx={{ backgroundColor: 'white' }} value={perDay} name='perDay' onChange={(e) => handleMedicationChange(e, j)}></TextField>
                  </Box>
                </Box>
                <Box className='inputField' display='flex' color='white'>
                  <Typography className='label'>Gap</Typography>
                  <TextField sx={{ backgroundColor: 'white' }} value={gap} name='gap' onChange={(e) => handleMedicationChange(e, j)}></TextField>
                </Box>


                {timings.map((val, i) => {
                  return (<Box key={i} className='problemCard'>
                    <Box className='inputField' display='flex' color='white'>
                      <Typography className='label'>Time</Typography>
                      <Input type='time' disableUnderline sx={{ backgroundColor: 'white' }} value={timing[j][i]} onChange={(e) => handleTimeChange(e, i, j)}></Input>

                    </Box>
                  </Box>)
                }
                )}
              </Box>
            );
          })}
        </Box>

      </Box>

      <Box className='immunization' backgroundColor='red' display='flex' flexDirection='column'>
        <Box display='flex' width='100%' alignItems='center'>
          <Typography variant='h4'>Immunizations</Typography>
          <Box width='100%' height="2px" backgroundColor='grey'></Box>
        </Box>

        <Button sx={{ color: 'white', width: '5rem' }} onClick={addImmunization}>Add</Button>
        <Box className='immuHolder' display='flex' backgroundColor='gray'>
          {immu.map((value, j) => {
            const { name, dosage } = value;
            return (
              <Box key={j} className='problemCard' display='flex' flexDirection={'column'} backgroundColor='pink'>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                  <Typography className='label'>Immunization</Typography>
                  <Button onClick={() => handleRemoveImmu(j)}>Cancel</Button>
                </Box>
                <Box className='inputField' display='flex' color='white'>
                  <Typography className='label'>Name</Typography>
                  <TextField sx={{ backgroundColor: 'white', width: '100%' }} value={name} name='name' onChange={(e) => handleImmuChange(e, j)}></TextField>
                </Box>

                <Box className='inputField' display='flex' color='white'>
                  <Typography className='label'>Dosage</Typography>
                  <TextField sx={{ backgroundColor: 'white' }} value={dosage} name='dosage' onChange={(e) => handleImmuChange(e, j)}></TextField>
                </Box>




              </Box>
            );
          })}
        </Box>

      </Box>

      <Box className='scans' backgroundColor='cyan' display='flex' flexDirection='column'>
        <Box display='flex' width='100%' alignItems='center'>
          <Typography variant='h4'>Scans</Typography>
          <Box width='100%' height="2px" backgroundColor='grey'></Box>
        </Box>

        <Button sx={{ color: 'white', width: '5rem' }} onClick={addScans}>Add</Button>
        <Box className='immuHolder' display='flex' backgroundColor='gray'>
          {scans.map((value, j) => {
            const { name, pdfLink,typeOf} = value;
            return (
              <Box key={j} className='scanCard' display='flex' flexDirection={'column'} backgroundColor='pink'>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                  <Typography className='label'>Scan</Typography>
                  <Button onClick={() => handleRemoveScan(j)}>Cancel</Button>
                </Box>
                <Box className='inputField' display='flex' color='white'>
                  <Typography className='label'>Name</Typography>
                  <TextField sx={{ backgroundColor: 'white', width: '100%' }} value={name} name='name' onChange={(e) => handleScanChange(e, j)}></TextField>
                </Box>

                <Box className='inputField' display='flex' color='white'>
                  <Typography className='label'>PDF link</Typography>
                  <TextField sx={{ backgroundColor: 'white' }} value={pdfLink} name='pdfLink' onChange={(e) => handleScanChange(e, j)}></TextField>
                </Box>
                <Box className='inputField' display='flex' color='white'>
                  <Typography className='label'>Type of</Typography>
                  <TextField sx={{ backgroundColor: 'white' }} value={typeOf} name='typeOf' onChange={(e) => handleScanChange(e, j)}></TextField>
                </Box>




              </Box>
            );
          })}
        </Box>

      </Box>





    </Grid>
  )

};
