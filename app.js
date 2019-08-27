import express from 'express';

const port = 3007;
const app = express();

app.listen(port, () => {console.log(`Server is running on port ${port}`)})
