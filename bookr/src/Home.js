import React from 'react';
import readerIcon from './public/images/reader.png';
import collection from './public/images/collection.png';
import discussion from './public/images/discussion.png';
import read from './public/images/read.png';
import sharing from './public/images/sharing.png';

class Home extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  render(){
    return(
      <div className="homeContainer">
        <section className="jumbotron jumbotron-fluid">
          <div className="headline">
            <h1>That’s the thing about books.</h1>
            <h1>They let you travel without moving your feet.</h1>
          </div>
        </section>
        <section className="bookrInfo">
          <div className="bookrInfoImage">
            <img src={readerIcon} alt="reader icon" />
          </div>
          <div className="bookrInformation">
            <h2> Book sharing made easy</h2>
          </div>
        </section>
        <section className="capabilities">
          <h2>Discover Bookr</h2>
          <div className="icon_container">
            <div className="icon_info col-sm-6 col-md-3">
              <img src={read} alt="reader icon" />
              <h3>Create a list of books you've read</h3>
            </div>
            <div sm={6} className="icon_info col-sm-6 col-md-3">
              <img src={collection} alt="reader icon" />
              <h3>Gather a collection of books you own and love</h3>
            </div>
            <div sm={6} className="icon_info col-sm-6 col-md-3">
              <img src={sharing} alt="reader icon" />
              <h3>Share books among friends</h3>
            </div>
            <div sm={6} className="icon_info col-sm-6 col-md-3">
              <img src={discussion} alt="reader icon" />
              <h3>Discuss books with friends and colleagues</h3>
            </div>
          </div>

        </section>
      </div>
    )
  }
}

export default Home;
