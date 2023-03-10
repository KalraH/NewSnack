import { Link } from 'react-router-dom';
import React, { Component } from 'react';

export class NewsItem extends Component  
{ 
    render() 
    {
        let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
        return (
            <div className='my-4'>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', right: '0', position: 'absolute' }}>
                        <span className="badge rounded-pill bg-success"> {source} </span>
                    </div>

                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title"> {title} </h5>
                        <p className="card-text"> {description} </p>
                        <p className="card-text"><small className="text-muted"> By {author ? author : "Unknown"} on {new Date(date).toGMTString()} </small></p>
                        {/* <p className="card-text"><small className="text-muted"> By {author ? author : "Unknown"} on {new Date(date).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})} </small></p> */}
                        
                        <Link rel="noreferrer" to={newsUrl} target='_blank' className="btn btn-sm btn-info"> Read More </Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewsItem