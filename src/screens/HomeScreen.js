import React from 'react';
import './HomeScreen.css';
import Nav from '../Nav';
import Banner from '../Banner';
import Row from '../Row';
import requests from '../requests';

function HomeScreen() {
  return (
    <div className="HomeScreen">

    {/* Nav */}
    < Nav />


    {/* Banner */}

    < Banner/>
    
    {/*  Row */}   

<Row
 title = 'NETFLIX ORIGINALS'  fetchUrl={requests.fetchNetflixOriginals} isLargeRow 
/>
    
<Row title = 'NETFLIX Trending' fetchUrl={requests.fetchTrending}/>


<Row title = 'NETFLIX Top Rated' fetchUrl={requests.fetchTopRated}/>


     </div>
  )
}

export default HomeScreen