import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import "../../../css/style.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Divider } from "@mui/material";
import { CloseButton, Col } from "react-bootstrap";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Inertia } from "@inertiajs/inertia";

export default function HandlingBatch(props){
    /**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */
    const {assignments, students, current_class}=usePage().props;
    const longEnUsFormatter=new Intl.DateTimeFormat('en-GB',{
        year: 'numeric',
        month: 'long',
        day:'numeric',
        hour12:true  
       })
       const longEnUsFormatTime=new Intl.DateTimeFormat('en-GB',{
        hour12: true,
       })

       const HandleConfirmAll=(e)=>{
        e.preventDefault();
        Inertia.post("Moderator/cofirmAllAttendance",{
          "batch":current_class.topic.batch
        });
       }
    return(
        <>
         <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<>
                <h2 className="font-semibold ts-1 leading-tight">Moderator Page / Class</h2>
                <h3 className="fs-4 text-color-blue">My CLass</h3>
            </>}
             childs={<>
               
                </>}
        >
        <Head title="Full Stack Developement" />

        <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden p-2 flex header-block">
                     
                     
                     {students.map((items, index)=>{
                        return (
                        <Card className="col-lg-6 col-md-12 col-sm-12 m-3" variant="outlined" key={index}>
                        <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Program Name
                        </Typography>
                        <Typography variant="h5" component="div">
                          {items.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        <b>by</b>  {items.trainerName}
                        </Typography>
                        <Typography variant="body2">
                        Started                      
                          <br />
                              {new Date(`${items.starts}`).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                        Ends                      
                          <br />
                              {new Date(`${items.ends}`).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                        Batch                      
                          <br />
                              {items.id}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small"><Link href={`/Moderator/view-students/${items.id}`}>View Students</Link></Button>
                </CardActions>
                </Card>
                       )
                     })}
                        </div>
                    </div>
                </div>
                     <Divider />
                <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">

                  <h2 className="fs-4 fw-bold mb-4"> fixed date is <span className="text-color-dark-blue">{new Date(`${ current_class.topic.date}`).toLocaleDateString()}</span></h2>
                    <div className="overflow-hidden bg-white p-2 flex header-block">
                   
                  <Col lg="5" md="12" sm="12" className="text-center p-5">
                    <h3 className="fw-bold text-color-dark-blue">BATCH </h3>
                     <h1 className="fw-bolder  text-color-dark-blue">
                     {
                        current_class.topic.batch
                     }</h1>
                     <h6 className="fw-bold">{ current_class.topic.sessiontype == "video" && 'Live Class' || current_class.topic.sessiontype == "book" && "Study session." || current_class.topic.sessiontype == "test" || "Quiz"}</h6>
                     <h6 className="">topic -- <span className="fw-bold">{current_class.topic.topic}</span></h6>

                     </Col>
                     <Col lg="7">
                      <h3 className="fs-5 fw-bold text-color-dark-blue m-5 p-3">Class Attendance</h3>
                     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                        {current_class.student.length > 0 ? 
                        (current_class.student.map((data, index)=>{
                            return(
                                <ListItem alignItems="flex-start" key={index}>
                                <ListItemAvatar>
                                  <Avatar alt={data.name} src={`../../../storage/jpg/${data.avatar}`} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={`${data.name}`}
                                  secondary={
                                    <React.Fragment>
                                    <Typography
                                      sx={{ display: 'inline' }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                      className="fw-bold"
                                    >
                                     {new Date(`${data.joined}`).toLocaleTimeString()+" — "} 
                                    </Typography>
                                    <button><Link href={`/attendance-cancel/${data.id}/topic/${data.TopicId}`} method="POST"> cancel attendance <CloseButton  style={{fontSize:"10px"}}/></Link></button>
                                  </React.Fragment>
                                  }

                                />
                              </ListItem>                                
                            )
                        })) : "No Student Yet"}
         
    </List>
    {current_class.student.length > 0 && <div onClick={HandleConfirmAll} style={{cursor:"pointer"}} className="rounded-full text-center p-3 text-color-white bg-primaries">End Class and Confirm all attendance</div>}
                     </Col>
                    </div>
                    </div>
                </div>

        </AuthenticatedLayout>
        </>
    )
}