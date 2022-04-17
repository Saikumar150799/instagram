const client = require('./connections.js')
const express = require("express")
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())


app.listen(3000, () => {
    console.log('server is now listening at port 3000')
})

client.connect()

app.get("/", (req, res) => {
    res.send("Go to /posts")
})

//  GET ALL POSTS
app.get('/posts', (req, res) => {
    client.query(`Select * from posts`, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result.rows)

        }
    })
    client.end
})

// GET A SINGLE POST
app.get('/posts/:post_id', (req, res) => {
    client.query(`Select * from posts where post_id=${req.params.post_id}`, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err.message)
        } else {
            res.send(result.rows)

        }
    })
    client.end
})

// POSTING POST 
app.post('/posts', (req, res) => {
    const post = req.body
    client.query(`INSERT INTO posts (user_id,name,image_url,caption) VALUES(${post.user_id},'${post.name}','${post.image_url}','${post.caption}')`, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send('Insertion was successful!')
        }
    })
    client.end
})

// UPDATE POST
app.put('/posts/:post_id', (req, res) => {
    let post = req.body
    client.query(`UPDATE posts SET post_id = ${post.post_id}, user_id = ${post.user_id}, name='${post.name}', image_url = '${post.image_url}',caption='${post.caption}' WHERE post_id = ${post.post_id}`, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err.message)
        } else {
            res.send('Update was successful')
        }
    })
    client.end
})

// DELETE POST
app.delete('/posts/:post_id', (req, res) => {
    
    client.query(`DELETE FROM posts WHERE post_id = ${req.params.post_id}`, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err.message)
        } else {
            res.send('Deletion was successful')
        }
    })
    client.end
})

// ********************************|POST COMPLETED|*****************************//

// GET ALL USERS
app.get('/users', (req, res) => {
    client.query(`Select * from users`, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result.rows)
        }
    })
    client.end
})

// GET A SINGLE USER
app.get('/users/:user_id', (req, res) => {
    client.query(`Select * from users where user_id=${req.params.user_id}`, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err.message)
        } else {
            res.send(result.rows)

        }
    })
    client.end
})

// POST  USER
app.post('/users', (req, res) => {
    const user = req.body
    client.query(`INSERT INTO users (avatar,name,email,password) VALUES('${user.avatar}','${user.name}','${user.email}','${user.password}')`, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send('Insertion was successful!')
        }
    })
    client.end
})

// UPDATE USER
app.put('/users/:user_id', (req, res) => {
    let post = req.body
    client.query(`UPDATE users SET (avatar,name) VALUES('${user.avatar}','${user.name}'`, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err.message)
        } else {
            res.send('Update was successful')
        }
    })
    client.end
})


// ********************************|USERS COMPLETED|*****************************//

// POST COMMENT
app.post('/posts/:post_id/comments', (req, res) => {
    const user = req.body
    client.query(`INSERT INTO comments (post_id,description) VALUES(${user.post_id},'${user.description}')`, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send('comment added successful!')
        }
    })
    client.end
})

// GET A COMMENT
app.get('/posts/:post_id/comments/', (req, res) => {
    client.query(`select * from comments where post_id=${req.params.post_id}`, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send(result.rows)
        }
    })
    client.end
})

// DELETE COMMENT
app.delete('/posts/:post_id/comments/:comment_id', (req, res) => {
    client.query(`DELETE FROM comments WHERE comment_id = ${req.params.comment_id}`, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err.message)
        } else {
            res.send('comment deleted successful!')
        }
    })
    client.end
})


// ********************************|COMMENTS COMPLETED|*****************************//

