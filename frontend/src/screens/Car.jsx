import React , {useEffect} from 'react'

const Car = () => {

    useEffect(() => {
        fetch("http://localhost:3000/api/cars")
        .then(res => res.json())
        .then(result => console.log(result))
    }, [])

    return (
        <div>Car</div>
    )
}

export default Car