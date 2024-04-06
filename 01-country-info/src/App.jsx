import React, { useState, useEffect } from 'react'
import wiki from 'wikijs'
import Info from './components/Info/Info'
import Map from './components/Map'
import Summary from './components/Summary'

export default function App() {

    const [selectedCountry, setSelectedCountry] = useState('iran')
    const [summary, setSummary] = useState('');
    const [info, setInfo] = useState(null)
    const [flag, setFlag] = useState(null)

    useEffect(() => {
        async function fetchData() {

            const page = await wiki().page(selectedCountry)

            const [summary, info, images] = await Promise.all([
                page.summary(),
                page.info(),
                page.images()
            ])

            const flag = info.imageFlag.replace(/\s/g, '_')
            images.some(image => {
                if (image.includes(flag)) {
                    setFlag(image);
                    return true;
                }

                return false;
            })
            setSummary(summary)
            setInfo(info)

        }

        fetchData()
    }, [selectedCountry])


    function handleSelectCountry(name) {
        setSelectedCountry(name)
    }
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col col-md-9">
                    <Map handleSelectCountry={handleSelectCountry} />
                </div>
                <div className="col-12 col-md-3">
                    <Info info={info} flag={flag} />
                </div>
            </div>
            <div className="row mt-3">
                <Summary summary={summary} />
            </div>
        </div>
    )
}
