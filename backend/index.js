require('dotenv').config()

const config = require('./config.json')
const mongoose = require('mongoose')

const User = require('./models/user.model')
const Note = require('./models/note.model')

const jwt = require('jsonwebtoken')
const { authenticationToken } = require('./utilities')

const express = require('express')
const cors = require('cors')

mongoose.connect(config.connectionString)

const app = express()

app.use(express.json())

app.use(
  cors({
    origin: '*'
  })
)

app.get('/', (req, res) => {
  res.json({ data: 'hello' })
})

app.post('/create-account', async (req, res) => {
  const { fullName, email, password } = req.body;

  if(!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name Required!"})
  }

  if(!email) {
    return res
      .status(400)
      .json({ error: true, message: "Email Required!"})
  }

  if(!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password Required!"})
  }

  const isUser = await User.findOne({ email: email });

  if(isUser) {
    return res.status(401).json({
      error: true,
      message: "User Already Exists! Please Login.",
    })
  }

  const user = new User({
    fullName,
    email,
    password
  });

  await user.save();

  const accessToken = jwt.sign(
    { user },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "3600m" }
  );

  return res.json({
    error: false,
    user,
    accessToken,
    message: "User Registered!"
  });
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if(!email) {
    return res.status(400).json({message: "Email Required!"})
  }

  if(!password) {
    return res.status(400).json({message: "Password Required!"})
  }

  const userInfo = await User.findOne({ email: email })

  if(!userInfo) {
    return res.status(400).json({message: "User does not exit. Create account."})
  }

  if(userInfo.email == email && userInfo.password == password) {
    // below var user is the paylod, and payload is to be sent as a JSON,
    // hence creating the JSON key value pair user and userInfo
    const user = { user: userInfo }

    const accessToken = jwt.sign(
      user,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3600m" }
    )

    return res.json({
      error: false,
      message: "Login Succesful!",
      email,
      accessToken
    })
  } else {
      return res.json({
        error: true,
        message: "Invalid Credentials!",
      })
  }
})

app.post('/add-note', authenticationToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if(!title) {
    return res.status(400).json({error: true, message: "Title Required!"})
  }

  if(!content) {
    return res.status(400).json({error: true, message: "Content Required!"})
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id
    })

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note Created Successfully!",
    })
  } catch(e) {
    return res.status(500).json({error: true, message: "Error 500: Internal Server Error!"})
  }
})

app.put('/edit-note/:noteId', authenticationToken, async (req, res) => {
  const noteId = req.params.noteId;
  const {title, content, tags, isPinned} = req.body;
  const { user } = req.user;

  if(!title && !content && !tags) {
    return res.status(400).json({
      error: true,
      message: "No Changes Provided!"
    })
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id })

    if(!note) {
      return res.status(404).json({
        error: true,
        message: "Note Doesn't Exist!"
      })
    }

    if(title)
      note.title = title;
    if(content)
      note.content = content;
    if(tags && tags.length > 0)
      note.tags = tags;
    if(isPinned)
      note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note Edited Successfully!",
    })
  } catch(e) {
      return res.status(500).json({
        error: true,
        message: "Internal Server Error",
      })
  }
})

app.get('/all-notes', authenticationToken, async(req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({ userId: user._id}).sort({ isPinned: -1 })

    return res.json({
      error: false,
      message: "Notes Retrieved Successfully!",
      notes
    })
  } catch(e) {
      return res.status(500).json({
        error: true,
        message: "Internal Server Error"
      })
  }
})

app.delete('/delete-note/:noteId', authenticationToken, async(req, res) => {
  const { user } = req.user;
  const noteId = req.params.noteId;

  try{
    const note = await Note.findOne({ "_id": noteId, "userId": user._id });

    if(!note) {
      return res.status(404).json({
        error: true,
        message: "Note Doesn't Exist!"
      })
    }

    await Note.deleteOne({ "_id": noteId, "userId": user._id });

    return res.json({
      error: false,
      message: "Note Deleted Successfully!"
    })
  } catch(e) {
      return res.status(500).json({
        error: true,
        message: "Internal Server Error"
      })
  }

})

app.put('/note-pin/:noteId', authenticationToken, async(req, res) => {
  const { user } = req.user;
  const { isPinned } = req.body;
  const noteId = req.params.noteId;

  try{
    const note = await Note.findOne({ "_id": noteId, "userId": user._id })

    if(!note) {
      return res.status(404).json({
        error: true,
        message: "Note Not Found!"
      })
    }

    if(isPinned != null)
      note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      message: "Note Updated Successfully!",
      note
    })
  } catch(e) {
      return res.status(500).json({
        error: true,
        message: "Internal Server Error"
      })
  }
})

app.get('/get-user', authenticationToken, async (req, res) => {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user._id})

  if(!isUser) {
    return res.status(401).json({
      error: true,
      message: "User Not Found!"
    })
  }

  return res.json({
    error: false,
    message: "User Retrieved!",
    user
  })
})

app.listen(8000)

module.exports = app
