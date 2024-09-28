const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const teamRoutes = require('./routes/team');

const app = express();

mongoose.connect('mongodb://localhost:27017/bgmi-tournament', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/team', teamRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));