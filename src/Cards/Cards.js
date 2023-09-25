import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { FetchingURL } from '../hooks/react-query-data';
import NavBar from '../components/NavBar/navbar';
import styles from './Cards.module.css'
import { Button, TextField } from '@mui/material';
const Cards = () => {
  const {data,isLoading, isError } = useQuery(['data'],FetchingURL)
  const [serchbyname,setSearchbyname] = useState('')
  if(isLoading) return <center><h1>Loading,please wait.....</h1></center>
  if(isError) return <h1>isError</h1>
  return (
    <>
        <NavBar title={'Beers'} />
        <div className={styles.Search_container}>
            <TextField style={{width:'80%'}}
             onChange={(e) => setSearchbyname(e.target.value)}
             label = 'Search by name'
              />
        </div>
        <div className={styles.main_box_container}>

        
        {
          data.length !== 0 && data.filter(item => {
                
            if(item){
                return (item.name.toLowerCase().includes(serchbyname.toLowerCase()))
            }
        })
          .map((item,index) => {
            const cleanedname = item.contributed_by.replace(/<|>/g, '');
            console.log(item)
            return(
              <div key={index} 
              className={styles.inner_container}  >
                <center style={{marginTop :'20px'}}>
                    <img style={{width:'300px',height:"300px"}} src={item.image_url}/>
                </center>
                 <div style={{marginLeft:"10px"}}>
                 <h1>Name: {item.name}</h1>
                <p>Tagline: {item.tagline} </p>
                <p>First Brewed: {item.first_brewed} </p>
                <p>Description: {item.description} </p>
                <p>ABV (Alcohol by Volume): {item.abv} </p>
                <p>IBU (International Bitterness Units): {item.ibu} </p>
                <p>PH: {item.ph }</p>
                <p>EBC: {item.ebc }</p>
                <p>SRM: {item.srm }</p>
                <p>Attenuation Level: {item.attenuation_level} </p>
                <p>Contributed By: {cleanedname} </p>
                <p>Food Pairing:</p>
                    {
                        item.food_pairing.map((food_pairing_name,index) => {
                            return <ul key={index}>
                                <li> {food_pairing_name} </li>
                            </ul>
                        })

                    }
                <h2>Ingredients:</h2>
                <ul>
                    <li>Malts:
                            {
                                item.ingredients.malt.map((malt_,index) => {
                                    return <ul key={index}>
                                        <li>
                                            {malt_.name} : {malt_.amount.value} {malt_.amount.unit}
                                        </li>
                                    </ul>
                                })
                            }
                    </li>
                    <li>Hops:
                            {
                                item.ingredients.hops.map((hop,index) => {
                                    return <ul key={index}>
                                        <li>
                                            {hop.name} : {hop.amount.value} {hop.amount.unit}
                                        </li>
                                    </ul>
                                })
                            }
                      
                    </li>
                    <li> {item.ingredients.yeast} </li>
                </ul>
                <h2>Method:</h2>
                <p>Fermentation Temperature: {item.method.fermentation.temp.value} {item.method.fermentation.temp.unit}</p>

                
                <h2>Mash Temperature:</h2>
                <ul>
                    <li>Temp: {item.method.mash_temp[0].temp.value} {item.method.mash_temp[0].temp.unit}</li>
                    <li>Duration: {item.method.mash_temp[0].duration} minutes</li>
                    <li>Twist : {
                    item.method.twist === null ? '----' : item.method.twist
                } </li>
                </ul>
                <p>Target FG: {item.target_fg} </p>
                <p>Target OG: {item.target_og} </p>
                <p>Volume: {item.volume.value} {item.volume.unit} </p>
                 </div>
                </div>
                    )
                })
                }
      </div>
    </>
  )
}

export default Cards;