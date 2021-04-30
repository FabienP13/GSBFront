import jsonwebtoken from 'jsonwebtoken'

export const postUsers = async (user) => {
    let response = await fetch('https://gsb-back.herokuapp.com/users/auth', {
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
    }, 
    body: JSON.stringify(user)
    })
    let {token} = await response.json()
    console.log(token)
    let decoded = jsonwebtoken.verify(token, 'ppe')
    return {decoded , token }
}