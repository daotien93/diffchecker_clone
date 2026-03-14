const express = require('express');
const cors = require('cors');
const diffRoutes = require('./routes/diffRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.use('/api/diff', diffRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Diffchecker clone API running on port ${PORT}`);
});

