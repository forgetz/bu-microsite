import { useEffect, useState } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';

import Chat from '../components/chat';
import Video from '../components/video';
import { Button } from 'react-bootstrap';


export default function Home() {

  const [isChatMode, setIsChatMode] = useState(true)

  const pubnub = new PubNub({
    publishKey: process.env.PUBNUB_PUBLISH_KEY,
    subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY,
    uuid: process.env.PUBNUB_UUID
  });

  const size = useWindowSize()

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({ width: null, height: null });
    
    useEffect(() => {
      if (typeof window !== 'undefined') {
        function handleResize() {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []);
    return windowSize;
  }

  function toggleAgenda() {
    setIsChatMode(!isChatMode)
  }


  return (
    <div style={{
      background: '#333',
      height: size.height,
      color: '#efefef',
      display: 'flex',
      flexDirection: 'row',
      padding: '3em'
    }}>

      <div style={{ 
          width: '65%', 
          background: '#990',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '2em'
        }}>
          <Video width="90%" height={ size.height * 0.8 }></Video>
        {/* <iframe width="90%" height={ size.height * 0.8 } src="https://www.youtube.com/embed/BOzIbb6tDKI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
      </div>

      <div style={{  
        width: '35%',
        background: '#250',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>

        {isChatMode ? 
          <div>
            <div style={{ width: '100%', textAlign: 'right', paddingRight: '2em' }}>
              <img src="/images/txt_livechat.png" height="40" alt="" />
            </div>
            
            <PubNubProvider client={ pubnub }>
              <Chat />
            </PubNubProvider>
          </div>
          :
          <div>
            Agenda
          </div>
        }
        <div style={{ width: '100%', textAlign: 'center', paddingTop: '2em' }}>
          <Button style={{
            background: "url('/images/btn_agenda.png') no-repeat top left",
            backgroundSize: "100% 100%",
            border: "none",
            width: '200px',
            height: '50px'
          }}
            onClick={ () => toggleAgenda() }
          >
          </Button>
        </div>

      </div>
    </div>
  )
}
