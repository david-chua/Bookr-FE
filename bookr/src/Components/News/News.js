import React from 'react';
import axios from 'axios';
import Article from './Article';

const REACT_APP_NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;

class News extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      articles: []
    }
  }

  componentDidMount(){
    axios.get(`https://newsapi.org/v2/everything?q=(books AND authors)&domains=nytimes.com,wsj.com&apiKey=${REACT_APP_NEWS_API_KEY}`)
      .then(response => {
        this.setState({
          articles: response.data.articles
        })
      })
      .catch(error => {
        console.log(error);
      })
  }
  render(){
    console.log(process.env)
    return(
      <div>
        <h1 className="bookrNews"> Bookr News </h1>
        <div className="NewsContainer">
          { this.state.articles.map(article => {
            return <Article key={article.url} article={article} />
          })}
        </div>
      </div>
    )
  }
}

export default News
