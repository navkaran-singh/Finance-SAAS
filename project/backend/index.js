const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const users = [];

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({ email: req.body.email, password: hashedPassword });
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post('/login', async (req, res) => {
  const user = users.find(user => user.email === req.body.email);
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ email: user.email }, 'secretKey');
      res.json({ token: token });
    } else {
      res.status(401).send('Not Allowed');
    }
  } catch {
    res.status(500).send();
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, 'secretKey', (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

const multer = require('multer');
const Papa = require('papaparse');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', authenticateToken, upload.single('csv'), (req, res) => {
  Papa.parse(req.file.buffer.toString(), {
    header: true,
    complete: function (results) {
      // Here, you would typically store the parsed data into your Supabase database
      // For now, we'll just log the data to the console
      const categorizedTransactions = results.data.map(transaction => {
        let category = 'Uncategorized';
        if (transaction.description.toLowerCase().includes('swiggy')) {
          category = 'Food';
        }
        // Add more categorization logic here
        return { ...transaction, category };
      });
      console.log(categorizedTransactions);
      res.json({ message: 'CSV uploaded and parsed successfully' });
    },
    error: function (error) {
      console.log(error);
      res.status(500).send('Error parsing CSV');
    },
  });
});

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});