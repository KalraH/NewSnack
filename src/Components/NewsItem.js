import React from 'react'
import {Link} from 'react-router-dom'

const NewsItem = (props) => { 
    return (
        <div className='my-4'>
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'flex-end', right: '0', position: 'absolute' }}>
                    <span className="badge rounded-pill bg-success"> {props.source} </span>
                </div>

                <img src={props.imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title"> {props.title} </h5>
                    <p className="card-text"> {props.description} </p>
                    <p className="card-text"><small className="text-muted"> By {props.author ? props.author : "Unknown"} on {new Date(props.date).toGMTString()} </small></p>
                    <Link rel="noreferrer" to={props.newsUrl} target='_blank' className="btn btn-sm btn-info"> Read More </Link>
                </div>
            </div>
        </div>
    )
}
export default NewsItem