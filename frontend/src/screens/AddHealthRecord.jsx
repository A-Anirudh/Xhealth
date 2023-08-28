import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Users } from '../sdk/users';
import { useAddHealthRecordMutation, useGetHealthRecordsMutation, useUploadPdfMutation } from '../slices/healthRecordSlice';
import { Box, Button, Grid, Input, TextField, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useTheme } from '@emotion/react';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';

export const AddHealthRecord = () => {
  const patientEmail = useSelector(state => state.patientId);
  const doctorId = useSelector(state => state.auth.doctorInfo._id)
  const user = new Users();
  const theme = useTheme();
  const link = 'common_url/'



  // const [records] = useGetHealthRecordsMutation();
  const [addRecord] = useAddHealthRecordMutation()
  const [uploadPdf] = useUploadPdfMutation(); 
  const [allRecords, setallRecords] = useState()



  const generateEmptyTimings = (count) => {
    return new Array(count).fill(''); // Initialize with empty arrays
  };


  //---------Dynamic input fields states-------
  const [problems, setproblems] = useState([""])
  const [allmeds, setallmeds] = useState([{ 'name': '', 'dosage': 0, 'perDay': 0, 'gap': 0, 'timings': [] }])
  const [timing, settiming] = useState([generateEmptyTimings(0)]);
  const [immu, setimmu] = useState([{ 'name': '', 'dosage': '' }])
  const [scans, setScans] = useState([{ 'name': '', 'pdfLink': link, 'typeOf': '' }]) //todo:encodedPDF->(entire pdf)->(base64string)
  const [body, setBody] = useState([''])
  //---------Dynamic input fields states-------

  const [newRecord, setnewRecord] = useState({
    'email': patientEmail,
    'record': {
      'doctorId': doctorId, //get from the local storage

      'diagnoses': {
        'data': '',
        'problems': '',//assign to problem array
      },

      'medications': {
        'startDate': '',
        'endDate': '',
        'allMeds': [{}]//assign to medsArray
      },

      'immunizations': [],//assign of immunizationArray

      'scans': [{}],//assign to scansArray
      'time':new Date(),
    }

  })


  // useEffect(() => {
  //   return async () => {
  //     await records({ email: patientEmail }).unwrap().then((data) => setallRecords(data))
  //   }
  // }, [patientEmail])

  if (!newRecord) return "loading"

  //-------Required Functions-----

  const handleOnSubmit = () => {
    console.log("submitting", newRecord);
    console.log('Submiiting PDF Body : ', body)
    const data = addRecord(newRecord)
    for (let i = 0; i < body.length; i++) {
      uploadPdf(body[i])
    }
    console.log('data added', data.unwrap())
  }


  const handleOtherChange = (e) => {
    const { name, value } = e.target
    console.log("name", name, 'value', value)
    if (name == 'diagnoses') {
      setnewRecord({ ...newRecord, record: { ...newRecord.record, diagnoses: { ...newRecord.record.diagnoses, data: value } } })
    }
    else if (name == 'startDate') {
      setnewRecord({ ...newRecord, record: { ...newRecord.record, medications: { ...newRecord.record.medications, startDate: value } } })
    }
    else if (name == 'endDate') {
      setnewRecord({ ...newRecord, record: { ...newRecord.record, medications: { ...newRecord.record.medications, endDate: value } } })
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
        prevValue.record.diagnoses.problems = updatedProblems;
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
        diagnoses: {
          ...prev.record.diagnoses,
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
  const addImmunization = () => {
    setimmu([...immu, { 'name': '', 'dosage': '' }])
  }
  const handleRemoveImmu = (i) => {
    const updateImmu = [...immu]
    updateImmu.splice(i, 1)
    setimmu(updateImmu)

    setnewRecord((prev) => ({
      ...prev,
      record: {
        ...prev.record,
        immunizations: updateImmu
      },
    }));
  }
  const handleImmuChange = (e, i) => {
    const { name, value } = e.target
    if (name == 'dosage') {
      setimmu((prev) => {
        const updatedImmu = [...prev];
        updatedImmu[i][name] = Number(value);
        setnewRecord((prev) => {
          const prevValue = { ...prev };
          prevValue.record.immunizations = updatedImmu;
          return prevValue;
        });
        return updatedImmu;
      });

    }
    else {
      setimmu((prev) => {
        const updatedImmu = [...prev];
        updatedImmu[i][name] = value;
        setnewRecord((prev) => {
          const prevValue = { ...prev };
          prevValue.record.immunizations = updatedImmu;
          return prevValue;
        });
        return updatedImmu;
      });

      console.log(name, value)
    }
  }
  //----Dynamic immunization----



  //----Dynamic Scans----
  const addScans = () => {
    setScans([...scans, { 'name': '', 'pdfLink': '', 'typeOf': '' }])
    setBody([...body, ''])
  }
  const handleRemoveScan = (i) => {
    const updateScans = [...scans]
    updateScans.splice(i, 1)
    setScans(updateScans)

    setnewRecord((prev) => ({
      ...prev,
      record: {
        ...prev.record,
        scans: updateScans
      },
    }));

    const updateBody = [...body]
    updateBody.splice(i, 1)
    setBody(updateBody)
  }
  const handleScanChange = (e, i) => {
    const { name, value } = e.target
    if (name == 'pdfLink') {
      const key = e.target.files[0].name;
      const updateScans = [...scans]
      updateScans[i]['name'] = key
      updateScans[i]['pdfLink'] = link + key
      setScans(updateScans)
      setnewRecord({ ...newRecord, 'record': { ...newRecord['record'], 'scans': scans } })

      //encoding
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        const updateBody = [...body]
        updateBody[i] = JSON.stringify({
          documentBase64: base64String,
          key: key
        });
        setBody(updateBody)
      }



    }
    else {
      const updateScans = [...scans]
      updateScans[i][name] = value
      setnewRecord({ ...newRecord, 'record': { ...newRecord['record'], 'scans': updateScans } })
    }

  }
  //----Dynamic Scans----
  useEffect(() => {

    console.log("Body", body)

  }, [body])









  //-------Required Functions-----
  // console.log('record', newRecord)
  return (
    <Grid sx={{ margin: '2rem 10rem', boxSizing: 'border-box' }}>
      <Grid
        item
        xl lg md sm xs xsm
        sx={{
          background: theme["purple-500"],
          padding: "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          borderRadius: "0 0 1rem 1rem",
          [theme.breakpoints.down("xsm")]: {
            padding: "0.7rem 2rem",
          },
        }}
      >
        <Link to='/' style={{ textDecoration: "none" }}>
          <Typography fontFamily='Poppins'
            variant="h4"
            fontWeight="bold"
            color="white"
            sx={{
              cursor: "pointer",
              [theme.breakpoints.down("sm")]: {
                fontSize: "5vw"
              },
            }}

          >
            XHealth
          </Typography>
        </Link>
        <Link to="/dashboard-doctor" style={{ textDecoration: "none", marginInline: '2rem' }}>
          <Typography fontFamily='Poppins' color="white" sx={{
            cursor: "pointer",
            [theme.breakpoints.down("sm")]: {
              fontSize: "1vw",
              display: "none"
            },
          }}>Dashboard</Typography>
        </Link>
        <Link to="/view-all-records" style={{ textDecoration: "none", marginInline: '2rem' }}>
          <Typography fontFamily='Poppins' color="white" sx={{
            cursor: "pointer",
            [theme.breakpoints.down("sm")]: {
              fontSize: "1vw",
              display: "none"
            },
          }}>View all records</Typography>
        </Link>


      </Grid>

      <Box color={theme.doctor.primary} className='title&button' display='flex' justifyContent='space-between' alignItems='center' padding={1} margin={2} >
        <Typography fontFamily='poppins' fontWeight='600' variant='h4'>Add Patient Health Record </Typography>
        <Button sx={{ color: 'white', backgroundColor: `${theme['green-btn']}`, textTransform: 'capitalize', fontFamily: 'poppins', fontSize: '1.2vw', padding: '0rem 2vw', borderRadius: "10px", '&:hover': { backgroundColor: "white", color: `${theme['green-btn']}`, outline: `2px solid ${theme['green-btn']}` }, boxShadow: '0px 4px 11px 0px rgba(0, 0, 0, 0.25);' }} onClick={handleOnSubmit}>Add new Record</Button>
      </Box>

      <Box className='diagnosis' padding={1} margin={2} display='flex' flexDirection='column'>
        <Box display='flex' width='100%' alignItems='center'>
          <Typography sx={{ fontFamily: 'poppins', fontWeight: '600', fontSize: '2vw', color: `${theme['grey-heading']}` }}>Diagnosis</Typography>
          <Box width='100%' height="2px" backgroundColor={theme['grey-heading']}></Box>
        </Box>
        <Box className='inputField' backgroundColor='' marginTop={2} sx={{ width: '100%', border: `1px solid ${theme['grey-border']}`, borderRadius: '10px', height: '5vh' }} display='flex' alignItems='center'>
          <Typography fontFamily='poppins' fontWeight="600" fontSize='1.0vw' padding='0.1rem 2rem' borderRight={`2px solid ${theme['grey-border']}`} className='label'>Diagnosis</Typography>
          <Input type='text' disableUnderline sx={{ fontFamily: "poppins", marginInline: '2rem', width: "100%", }} name='diagnoses' value={newRecord.record.diagnoses.data} onChange={(e) => handleOtherChange(e)}></Input>
        </Box>
      </Box>

      <Box className='problems' padding={1} margin={2} display='flex' flexDirection='column'>
        <Box display='flex' width='100%' alignItems='center'>
          <Typography sx={{ fontFamily: 'poppins', fontWeight: '600', fontSize: '2vw', color: `${theme['grey-heading']}` }}>Problems</Typography>
          <Box width='100%' height="2px" backgroundColor='grey'></Box>
        </Box>

        <Button sx={{ color: 'white', backgroundColor: `${theme['green-btn']}`, textTransform: 'capitalize', fontFamily: 'poppins', fontSize: '1vw', padding: '0rem 2vw', borderRadius: "10px", '&:hover': { backgroundColor: "white", color: `${theme['green-btn']}`, outline: `2px solid ${theme['green-btn']}` }, width: '2vw', boxShadow: '0px 4px 11px 0px rgba(0, 0, 0, 0.25);' }} onClick={addProblem}>Add</Button>

        <Box className='problemsHolder' display='flex' backgroundColor={theme['grey-bg']} padding={2} margin={2} borderRadius={2} flexWrap={'wrap'} gap='1rem' alignItems={'left'}>
          {problems.map((val, i) =>
            <Box key={i} className='problemCard' >
              <Box className='inputField' display='flex' color='white' padding={2} height='5vh' alignItems='center' border={`1px solid ${theme['grey-border']}`} backgroundColor='white' borderRadius={'0.6rem'}>
                <Typography className='label' color={'black'} fontFamily={'poppins'} fontWeight={'600'} paddingX={'1rem'} paddingY={'0.1rem'} backgroundColor='' borderRight={`2px solid ${theme['grey-border']}`} >Problem</Typography>
                <Input type='text' disableUnderline sx={{ backgroundColor: 'white', fontFamily: 'poppins', paddingInline: '2rem' }} value={val} onChange={(e) => handleProblemChange(e, i)}></Input>
                <Button onClick={handleProblemRemove} ><ClearIcon sx={{ color: `${theme.Cancelled}` }} /></Button>
              </Box>
            </Box>
          )}

        </Box>
      </Box>

      <Box className='medicines' padding={1} margin={2} display='flex' flexDirection='column'>
        <Box display='flex' width='100%' alignItems='center'>
          <Typography sx={{ fontFamily: 'poppins', fontWeight: '600', fontSize: '2vw', color: `${theme['grey-heading']}` }}>Medicines</Typography>
          <Box width='100%' height="2px" backgroundColor='grey'></Box>
        </Box>
        <Box display='flex' alignItems='center' flexWrap={'wrap'} margin={2} gap={'1rem'}>

          <Box display={'flex'} color='white' padding={2} height='5vh' alignItems='center' border={`1px solid ${theme['grey-border']}`} backgroundColor='white' borderRadius={'0.6rem'}>
            <Typography color={'black'} fontFamily={'poppins'} fontWeight={'600'} paddingX={'1rem'} paddingY={'0.1rem'} backgroundColor='' borderRight={`2px solid ${theme['grey-border']}`} >Start Date</Typography >
            <Input type='date' disableUnderline sx={{ backgroundColor: 'white', fontFamily: 'poppins', paddingInline: '2rem' }} name='startDate' value={newRecord.record.medications.startDate} onChange={(e) => handleOtherChange(e)}></Input>
          </Box>

          <Box display={'flex'} color='white' padding={2} height='5vh' alignItems='center' border={`1px solid ${theme['grey-border']}`} backgroundColor='white' borderRadius={'0.6rem'}>
            <Typography color={'black'} fontFamily={'poppins'} fontWeight={'600'} paddingX={'1rem'} paddingY={'0.1rem'} backgroundColor='' borderRight={`2px solid ${theme['grey-border']}`}>End Date</Typography >
            <Input type='date' disableUnderline sx={{ backgroundColor: 'white', fontFamily: 'poppins', paddingInline: '2rem' }} name='endDate' value={newRecord.record.medications.endDate} onChange={(e) => handleOtherChange(e)}></Input>
          </Box>

        </Box>
        <Button sx={{ color: 'white', backgroundColor: `${theme['green-btn']}`, textTransform: 'capitalize', fontFamily: 'poppins', fontSize: '1vw', padding: '0rem 2vw', borderRadius: "10px", '&:hover': { backgroundColor: "white", color: `${theme['green-btn']}`, outline: `2px solid ${theme['green-btn']}` }, width: '2vw', boxShadow: '0px 4px 11px 0px rgba(0, 0, 0, 0.25);' }} onClick={addMedication}>Add</Button>
        <Box className='medicineHolder' display='flex' backgroundColor={theme['grey-bg']} padding={4} margin={2} borderRadius={2} flexWrap={'wrap'} gap='1rem' alignItems={'left'} >
          {allmeds.map((value, j) => {
            const { name, dosage, perDay, gap, timings } = value;
            return (
              <Box key={j} className='problemCard' display='flex' flexDirection={'column'} backgroundColor={theme['purple-bg']} paddingX={2} paddingY={2} borderRadius={3} width={"25vw"} gap={'0.8rem'}>
                <Box display='flex' alignItems='center' justifyContent='space-between' marginX={'1rem'}>
                  <Typography className='label' sx={{ fontFamily: 'poppins', fontSize: '1.5vw', fontWeight: '500', color: `${theme['magenta']}` }} >Medicine</Typography>
                  <Button onClick={() => handleRemoveMedication(j)}><ClearIcon sx={{ color: `${theme.Cancelled}` }} /></Button>
                </Box>
                <Box className='inputField' display='flex' color='white' padding={2} height='5vh' alignItems='center' border={`1px solid ${theme['grey-border']}`} backgroundColor='white' borderRadius={'0.6rem'}>
                  <Typography color={'black'} fontFamily={'poppins'} fontWeight={'600'} paddingX={'1rem'} paddingY={'0.1rem'} backgroundColor='' borderRight={`2px solid ${theme['grey-border']}`} className='label'>Name</Typography>
                  <Input type='text' disableUnderline sx={{ backgroundColor: 'white', fontFamily: 'poppins', paddingInline: '2rem' }} value={name} name='name' onChange={(e) => handleMedicationChange(e, j)}></Input>
                </Box>


                <Box className='inputField' display='flex' color='white' padding={2} height='5vh' alignItems='center' border={`1px solid ${theme['grey-border']}`} backgroundColor='white' borderRadius={'0.6rem'} >
                  <Typography color={'black'} fontFamily={'poppins'} fontWeight={'600'} paddingX={'1rem'} paddingY={'0.1rem'} backgroundColor='' borderRight={`2px solid ${theme['grey-border']}`}>Dosage</Typography>
                  <Input type='text' disableUnderline sx={{ backgroundColor: 'white', fontFamily: 'poppins', paddingInline: '2rem' }} value={dosage} name='dosage' onChange={(e) => handleMedicationChange(e, j)}></Input>
                </Box>
                <Box className='inputField' display='flex' color='white' padding={2} height='5vh' alignItems='center' border={`1px solid ${theme['grey-border']}`} backgroundColor='white' borderRadius={'0.6rem'}>
                  <Typography color={'black'} fontFamily={'poppins'} paddingX={'1rem'} fontWeight={'600'} borderRight={`2px solid ${theme['grey-border']}`}>Per day</Typography>
                  <Input type='text' disableUnderline sx={{ backgroundColor: 'white', fontFamily: 'poppins', paddingInline: '2rem' }} value={perDay} name='perDay' onChange={(e) => handleMedicationChange(e, j)}></Input>
                </Box>

                <Box className='inputField' display='flex' color='white' padding={2} height='5vh' alignItems='center' border={`1px solid ${theme['grey-border']}`} backgroundColor='white' borderRadius={'0.6rem'}>
                  <Typography color={'black'} fontFamily={'poppins'} fontWeight={'600'} paddingX={'1rem'} paddingY={'0.1rem'} backgroundColor='' borderRight={`2px solid ${theme['grey-border']}`}>Gap</Typography>
                  <Input type='text' disableUnderline sx={{ backgroundColor: 'white', fontFamily: 'poppins', paddingInline: '2rem' }} value={gap} name='gap' onChange={(e) => handleMedicationChange(e, j)}></Input>
                </Box>


                {timings.map((val, i) => {
                  return (<Box key={i} className='problemCard'>
                    <Box className='inputField' display='flex' padding={2} height='5vh' alignItems='center' border={`1px solid ${theme['grey-border']}`} backgroundColor='white' borderRadius={'0.6rem'}>
                      <Typography color={`${theme['magenta']}`} fontFamily={'poppins'} fontWeight={'600'} paddingX={'1rem'} paddingY={'0.1rem'} backgroundColor='' borderRight={`2px solid ${theme['grey-border']}`}>Time</Typography>
                      <Input type='time' disableUnderline sx={{ backgroundColor: 'white', fontFamily: 'poppins', paddingInline: '2rem', color: `${theme['magenta']}`, fontWeight: '600' }} value={timing[j][i]} onChange={(e) => handleTimeChange(e, i, j)}></Input>

                    </Box>
                  </Box>)
                }
                )}
              </Box>
            );
          })}
        </Box>

      </Box>

      <Box className='immunization' padding={1} margin={2} display='flex' flexDirection='column'>
        <Box display='flex' width='100%' alignItems='center'>
          <Typography sx={{ fontFamily: 'poppins', fontWeight: '600', fontSize: '2vw', color: `${theme['grey-heading']}` }}>Immunizations</Typography>
          <Box width='100%' height="2px" backgroundColor='grey'></Box>
        </Box>

        <Button sx={{ color: 'white', backgroundColor: `${theme['green-btn']}`, textTransform: 'capitalize', fontFamily: 'poppins', fontSize: '1vw', padding: '0rem 2vw', borderRadius: "10px", '&:hover': { backgroundColor: "white", color: `${theme['green-btn']}`, outline: `2px solid ${theme['green-btn']}` }, width: '2vw', boxShadow: '0px 4px 11px 0px rgba(0, 0, 0, 0.25);' }}
          onClick={addImmunization}>Add</Button>
        <Box className='immuHolder' display='flex' backgroundColor={theme['grey-bg']} padding={2} margin={2} borderRadius={2} flexWrap={'wrap'} gap='1rem' alignItems={'left'}>
          {immu.map((value, j) => {
            const { name, dosage } = value;
            return (
              <Box key={j} className='problemCard' display='flex' flexDirection={'column'} backgroundColor={theme['purple-bg']} paddingX={2} paddingY={2} borderRadius={3} width={"25vw"} gap={'0.8rem'}>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                  <Typography className='label' sx={{ fontFamily: 'poppins', fontSize: '1.5vw', fontWeight: '500', color: `${theme['magenta']}` }}>Immunization</Typography>
                  <Button onClick={() => handleRemoveImmu(j)}><ClearIcon sx={{ color: `${theme.Cancelled}` }} /></Button>
                </Box>
                <Box className='inputField' display='flex' color='white' padding={2} height='5vh' alignItems='center' border={`1px solid ${theme['grey-border']}`} backgroundColor='white' borderRadius={'0.6rem'}>
                  <Typography color={'black'} fontFamily={'poppins'} fontWeight={'600'} paddingX={'1rem'} paddingY={'0.1rem'} backgroundColor='' borderRight={`2px solid ${theme['grey-border']}`}>Name</Typography>
                  <Input type='text' disableUnderline sx={{ backgroundColor: 'white', fontFamily: 'poppins', paddingInline: '2rem' }} value={name} name='name' onChange={(e) => handleImmuChange(e, j)}></Input>
                </Box>

                <Box className='inputField' display='flex' color='white' padding={2} height='5vh' alignItems='center' border={`1px solid ${theme['grey-border']}`} backgroundColor='white' borderRadius={'0.6rem'}>
                  <Typography color={'black'} fontFamily={'poppins'} fontWeight={'600'} paddingX={'1rem'} paddingY={'0.1rem'} backgroundColor='' borderRight={`2px solid ${theme['grey-border']}`}>Dosage</Typography>
                  <Input type='text' disableUnderline sx={{ backgroundColor: 'white', fontFamily: 'poppins', paddingInline: '2rem' }} value={dosage} name='dosage' onChange={(e) => handleImmuChange(e, j)}></Input>
                </Box>




              </Box>
            );
          })}
        </Box>

      </Box>

      <Box className='scans' padding={1} margin={2} display='flex' flexDirection='column'>
        <Box display='flex' width='100%' alignItems='center'>
          <Typography sx={{ fontFamily: 'poppins', fontWeight: '600', fontSize: '2vw', color: `${theme['grey-heading']}` }}>Scans</Typography>
          <Box width='100%' height="2px" backgroundColor='grey'></Box>
        </Box>

        <Button sx={{ color: 'white', backgroundColor: `${theme['green-btn']}`, textTransform: 'capitalize', fontFamily: 'poppins', fontSize: '1vw', padding: '0rem 2vw', borderRadius: "10px", '&:hover': { backgroundColor: "white", color: `${theme['green-btn']}`, outline: `2px solid ${theme['green-btn']}` }, width: '2vw', boxShadow: '0px 4px 11px 0px rgba(0, 0, 0, 0.25);' }}
          onClick={addScans}>Add</Button>
        <Box className='immuHolder' display='flex' backgroundColor={theme['grey-bg']} padding={2} margin={2} borderRadius={2} flexWrap={'wrap'} gap='1rem' alignItems={'left'}>
          {scans.map((value, j) => {
            const { name, pdfLink, typeOf } = value;
            return (
              <Box key={j} className='scanCard' display='flex' flexDirection={'column'} backgroundColor={theme['purple-bg']} paddingX={2} paddingY={2} borderRadius={3} width={"30vw"} gap={'0.8rem'}>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                  <Typography color={'black'} fontFamily={'poppins'} fontWeight={'600'} paddingX={'1rem'} paddingY={'0.1rem'} backgroundColor='' borderRight={`2px solid ${theme['grey-border']}`} sx={{ fontFamily: 'poppins', fontSize: '1.5vw', fontWeight: '500', color: `${theme['magenta']}` }}>Scan</Typography>
                  <Button onClick={() => handleRemoveScan(j)}><ClearIcon sx={{ color: `${theme.Cancelled}` }} /></Button>
                </Box>
                <Box className='inputField' display='flex' color='white' padding={2} height='5vh' alignItems='center' border={`1px solid ${theme['grey-border']}`} backgroundColor='white' borderRadius={'0.6rem'}>
                  <Typography color={'black'} fontFamily={'poppins'} fontWeight={'600'} paddingX={'1rem'} paddingY={'0.1rem'} fontSize={'1rem'} borderRight={`2px solid ${theme['grey-border']}`}>{'Upload Scan'}</Typography>
                  <input type='file' style={{ backgroundColor: 'white', fontFamily: 'poppins', paddingInline: '1.5rem', flex: '1', color: 'black', appearance: 'none', }} accept='.pdf' name='pdfLink' onChange={(e) => handleScanChange(e, j)} />
                </Box>
                <Box className='inputField' display='flex' color='white' padding={2} height='5vh' alignItems='center' border={`1px solid ${theme['grey-border']}`} backgroundColor='white' borderRadius={'0.6rem'}>
                  <Typography color={'black'} fontFamily={'poppins'} fontWeight={'600'} paddingX={'1rem'} paddingY={'0.1rem'} backgroundColor='' borderRight={`2px solid ${theme['grey-border']}`}>Type of</Typography>
                  <Input type='text' disableUnderline sx={{ backgroundColor: 'white', fontFamily: 'poppins', paddingInline: '2rem', flex: '1' }} value={typeOf} name='typeOf' onChange={(e) => handleScanChange(e, j)}></Input>
                </Box>




              </Box>
            );
          })}
        </Box>

      </Box>





    </Grid>
  )

};
