import { Avatar } from '@material-ui/core'
import React from 'react'
import "./Video.css"
function Video({image,title,channel,views,timestamp,channelImg}) {
    return (
        <div className="video_div">
            <img className="video_thumbnail" src={image} alt=""/>
            <div className="video_info">
                <Avatar 
                className="video_avatar"
                alt={channel}
                src={channelImg}/>
                <div className="video_text">
                    <h4>{title}</h4>
                    <p>{channel}</p>
                    <p>
                        {views} • {timestamp}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Video
