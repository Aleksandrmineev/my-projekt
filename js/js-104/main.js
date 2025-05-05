'use strict'

const users = [
    {
    name: `Max`,
    age:23,
},
{
    name: `Ivan`,
    age:25,
},
{
    name: `robert`,
    age:12,
},
]

const userName = []

users.forEach((user) => {
    userName.push(user.name)
})
console.log(userName)