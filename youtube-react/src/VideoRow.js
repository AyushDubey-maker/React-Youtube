import React from 'react'
import "./VideoRow.css"
function VideoRow({views,subs,description,timestamp,channel,title,image}) {
    return (
        <div className="video_row">
            <img src={image} alt={channel}/>
            <div className="videoRow_text">
                <h3 className="videoRow_title">{title}</h3>
                <p className="videoRow_headline">
                    {channel} • <span className="videoRow_subs">{subs}</span> Subscribers {views} • {timestamp}
                </p>
                <p className="videoRow_description">{description}</p>
            </div>
        </div>
    )
}

export default VideoRow
