const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const dynamoDb = require("../../database/setup/database");

const SongRouter = Router();

SongRouter.post('/upload', (req, res) => {
    const { file } = req; // Angenommen, du verwendest Middleware wie multer zum Hochladen von Dateien

    const params = {
        Bucket: 'my-music-app-bucket',
        Key: file.originalname,
        Body: file.buffer,
        ContentType: 'audio/mpeg'
    };

    s3.upload(params, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }

        // Speichere Metadaten in DynamoDB
        const songData = {
            SongID: file.originalname, // oder eine generierte ID
            Title: req.body.title,
            Artist: req.body.artist,
            Album: req.body.album,
            Genre: req.body.genre,
            S3Path: data.Location 
        };

        const dbParams = {
            TableName: 'Songs',
            Item: songData
        };

        dynamoDB.put(dbParams, (dbErr) => {
            if (dbErr) {
                return res.status(500).send(dbErr);
            }
            res.status(200).send('File uploaded and metadata saved successfully!');
        });
    });
});



module.exports = { SongRouter };