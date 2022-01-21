import { useEffect, useState } from "react";



export default function Video(props) {

   const [videoId, setVideoId] = useState('')
   
   function GetCurrentVideo() {
      const strdate = new Date().toISOString();
      console.log(strdate)

      if (strdate.startsWith("2022-01-20T11:35")) {
         setVideoId("https://www.youtube.com/embed/BOzIbb6tDKI");
      }
      else {
         setVideoId("https://www.youtube.com/embed/BTofOoTponU");
      }

   }

   useEffect(()=> {
      const intervalId = setInterval(()=> {
         GetCurrentVideo();
      }, 5000)
      return ()=> clearInterval(intervalId)
   }, [])

   return (
      <>
         <iframe width={ props.width } height={ props.height } 
            src={videoId}
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
         >
         </iframe>
      </>

   )
}