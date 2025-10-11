import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
   res.send({ message: 'Hello from Express!' });
});

app.post('/api/world', (req, res) => {
   try {
      const { data } = req.body;
      console.log('Received data:', data);
      
      
      res.json({
         message: `I received your POST request. This is what you sent me: ${data}`,
      });
   } catch (error) {
      console.error('Error handling POST /api/world:', error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
