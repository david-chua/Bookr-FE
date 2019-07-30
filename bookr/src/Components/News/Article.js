import React from 'react';

const Article = props => {
  console.log(props.article);
  return(
    <div className="articleContainer">
      <div className="articleTitleContainer">
        <a className="articleLink" target="_blank" rel="noopener noreferrer" href={props.article.url}><h1> {props.article.title} </h1></a>
      </div>
        <img className="articleImage" src={props.article.urlToImage} alt="article" />
        <section className="articleInfo">
          <h3 className="author"> {props.article.author} </h3>
          <h3 className="sourceName"> {props.article.source.name}</h3>
          <h3 className="desc"> {props.article.description}</h3>
        </section>
    </div>
  )
}


export default Article;
