import Spinner from './Spinner';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component 
{
    static defaultProps = {
        country: 'in',
        pageSize: 5,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        apiKey: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        setProgress: PropTypes.func.isRequired
    }

    setDocTitle = (str) => {
        let newStr = str.charAt(0).toUpperCase() + str.slice(1);
        return newStr;
    }

    constructor(props)
    {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `News Monkey - ${this.setDocTitle(this.props.category)}`;
    }
    
    async componentDidMount() 
    {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        this.props.setProgress(30);
        this.setState({loading: true});
        let data = await (await fetch(url)).json(); 
        this.props.setProgress(50);

        this.setState({
            articles: data.articles, 
            totalResults: data.totalResults,
            loading: false
        });
        this.props.setProgress(70);
        this.props.setProgress(100);
    }

    fetchMoreData = async () => {
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        this.setState({loading: true});
        let data = await (await fetch(url)).json();

        this.setState({
            articles: this.state.articles.concat(data.articles), 
            totalResults: data.totalResults,
            loading: false
        });
    };
    
    render() 
    {
        return (
            <>
                <h1 className='text-center' style={{margin: '35px 0px'}}> NewsMonkey - Top {this.setDocTitle(this.props.category)} Headlines </h1>
                
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />} >
                    
                    <div className="container">
                        <div className="row"> {
                            this.state.articles.map( (ele) => {
                                let desc = (ele.description) ? ele.description : ' ';
                                let heading = (ele.title) ? ele.title : ' ';
                                let img = ele.urlToImage ? ele.urlToImage : "http://surl.li/ficqj";

                                return <div className="col-md-4" key={ele.url}>
                                            <NewsItem 
                                                title={ (heading.length < 46) ? heading : heading.slice(0, 45) + ' ...' } 
                                                description={ (desc.length < 88) ? desc : (desc.slice(0, 88) + ' ...') } 
                                                imageUrl={img} 
                                                newsUrl={ele.url}
                                                author={ele.author}
                                                date={ele.publishedAt}
                                                source={ele.source.name} />
                                        </div>;
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}
export default News;