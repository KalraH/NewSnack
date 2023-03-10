import Spinner from './Spinner'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component"

const News = (props) => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [totalResults, setTotalResults] = useState(0);

    const setDocTitle = (str) => {
        let newStr = str.charAt(0).toUpperCase() + str.slice(1);
        return newStr;
    }

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        props.setProgress(30);
        setLoading(true);
        let data = await (await fetch(url)).json(); 
        
        props.setProgress(50);
        setArticles(data.articles);
        setTotalResults(data.totalResults);
        
        props.setProgress(70);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `News Monkey - ${setDocTitle(props.category)}`;
        updateNews(); // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        
        let data = await (await fetch(url)).json();
        setTotalResults(data.totalResults);
        setArticles(articles.concat(data.articles));
    };
    
    return (
        <>
            <h1 className='text-center' 
                style={{margin: '35px 0px', 
                        marginTop: '90px'}}> NewSnack - Top {setDocTitle((props.category === 'general' ) ? '' : props.category)} Headlines </h1>
            
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />} >
                
                <div className="container">
                    <div className="row"> {
                        articles.map( (ele) => {
                            let desc = (ele.description) ? ele.description : ' ';
                            let heading = (ele.title) ? ele.title : ' ';

                            return <div className="col-md-4" key={ele.url}>
                                        <NewsItem 
                                            title={ (heading.length < 46) ? heading : heading.slice(0, 45) + ' ...' } 
                                            description={ (desc.length < 88) ? desc : (desc.slice(0, 88) + ' ...') } 
                                            imageUrl={ele.urlToImage ? ele.urlToImage : "http://surl.li/ficqj"} 
                                            newsUrl={ele.url}
                                            author={ele.author}
                                            date={ele.publishedAt}
                                            source={ele.source.name}/>
                                    </div>;
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    apiKey: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired
}

export default News