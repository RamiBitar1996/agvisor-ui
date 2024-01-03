import React, { useState, useEffect } from 'react'
import { queries, queryProfile } from '@monsantoit/profile-client'
import BayerLogo from '../assets/bayer.png'

const Home = () => {
    const [fullName, setFullName] = useState('')

    useEffect(() => {
        async function loadData() {
            const rs = await queryProfile(queries.currentUser())
            setFullName(rs.getCurrentUser.preferredName.full)
        }
        loadData()
    }, [])


    return (
        <div className={'home'}>
            <h1>
                {fullName && `Hello, ${fullName}`}
            </h1>
            <div>
                <img src={BayerLogo} />
                <p>
                    The AgVisor is a POC that is designed to help sales, agronomy, and support teams both on and off the field <br />
                    with questions related to agronomy, farm management, products, etc. This is not designed to be a final <br />
                    source of truth but instead a supplemental source of information
                </p>
            </div>
        </div>
    )
}

export default Home