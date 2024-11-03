import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import techRoutes from './routes/tech.routes.js';
import workfieldRoutes from './routes/workfields.routes.js';
import workorderRoutes from './routes/workOrder.routes.js';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/technicians', techRoutes);
app.use('/api/workfields', workfieldRoutes);
app.use('/api/workorders', workorderRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const uri = process.env.MONGODB_URI;
console.log(uri);
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

export default app;