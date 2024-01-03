import React, {useState, useEffect} from 'react'
import {queries, queryProfile} from '@monsantoit/profile-client'

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
        </div>
    )
}

export default Home