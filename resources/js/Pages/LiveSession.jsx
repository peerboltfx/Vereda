import React, {useState,useRef} from "react";
import ReactDOM from "react-dom";
import Peer from "simple-peer";
import Pusher from "pusher-js";
import { MediaHandler } from "../MediaHandler";


export default function LiveSession(){
    const [session , setSession] = useState({
        hasMedia:false,
        otherUserId:null
    });

    const VideoRef=useRef(null);

    const mediaHandler = new MediaHandler;


    mediaHandler.getPermission().then((stream)=>{
        setSession({hasMedia:true});
        let video=VideoRef.current;
       
            
            video.srcObject= stream;
            
    
         video.play();
            

    }).catch(err =>{
        alert(err);
    })

    return(
        <div><video ref={VideoRef} /></div>
    )
}