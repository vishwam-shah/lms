import React, {FC, useEffect, useState} from 'react'
import { useGetVideoCipherOTPMutation } from '@/redux/features/courses/coursesApi';

type Props = {
  videoUrl: string,
  title: string,
}

const CoursePlayer: FC<Props> = ({videoUrl, title}) => {
  const [videoData, setVideoData] = useState({
    otp:"",
    playbackInfo:"",
  });
  
  const [getVideoCipherOTP] = useGetVideoCipherOTPMutation();

  useEffect(() => {
    if (videoUrl) {
      getVideoCipherOTP(videoUrl).then((res: any) => {
        if (res.data) {
          setVideoData(res.data);
        }
      }).catch((error) => {
        console.log("Video cipher error:", error);
      });
    }
  }, [videoUrl, getVideoCipherOTP])
  
  return (
    <div style={{paddingTop:"56.25%", position:"relative", width: "100%"}}>
      {
        videoData.otp && videoData.playbackInfo !== "" ? (
          <iframe 
            src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=Ub90iZX0eUXH0Nv`}
            style={{
              border:0,
              width:"100%",
              height:"100%",
              position:"absolute",
              top:0,
              left:0,
            }} 
            allowFullScreen={true} 
            allow="encrypted-media"
            title={title}
          ></iframe>
        ) : (
          <div style={{
            position:"absolute",
            top:0,
            left:0,
            width:"100%",
            height:"100%",
            backgroundColor:"#f0f0f0",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            color:"#666",
            fontSize:"16px",
            textAlign:"center",
            borderRadius:"8px"
          }}>
            {videoUrl ? (
              <div>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                Loading video...
              </div>
            ) : (
              <div>
                <div className="text-4xl mb-2">🎥</div>
                Video preview will appear here
              </div>
            )}
          </div>
        )
      }
    </div>
  )
}

export default CoursePlayer