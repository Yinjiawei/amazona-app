import express from 'express';
import mongoose from 'mongoose'
import data from './data.js'
import userRouter from './routers/userRouter.js';

const app = express();
mongoose.connect("mongodb://localhost/amazona", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.get('/api/products/:id', (req, res) => {
    const product = data.products.find(x => x._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(400).send({ message: 'Product NOT Found!' });
    }
});

app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.use('/api/users', userRouter);
app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err, req, rep, next) => {
    rep.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});
