import React from 'react';

const Details = ({album, artists, name, external_urls }) => {
  return ( 
    <div>
      <div>
        <a href={external_urls.spotify}>
        <img src={album.images[0].url} alt={name} />
        </a>
      </div>
      <div>
        <label htmlFor={name}>{name}</label>
      </div>
      <div>
        <label htmlFor={artists[0].name}>
          {artists[0].name}
        </label>
      </div>
    </div>
   );
}
 
export default Details;