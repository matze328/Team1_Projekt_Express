const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { DynamoDB } = require("aws-sdk");
const dynamoDB = require("../../database/dynamoDB/setup");

const SongRouter = Router();

SongRouter.post('/upload', async (req, res) => {
    const { file } = req; // Angenommen, du verwendest Middleware wie multer zum Hochladen von Dateien

    const params = {
        Bucket: 'music-app-bucket',
        Key: file.originalname,
        Body: file.buffer,
        ContentType: 'audio/mpeg'
    };

    await s3.upload(params, (err, data) => {
        if (err) {
            return res.status(StatusCodes.BAD_GATEWAY).send(err);
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

        DynamoDB.put(dbParams, (dbErr) => {
            if (dbErr) {
                return res.status(StatusCodes.BAD_REQUEST).send(dbErr);
            }
            res.status(StatusCodes.OK).send('File uploaded and metadata saved successfully!');
        });
    });
});
SongRouter.get("/all", async (SongID) => {
    const params = {
        TableName: "Songs",
        Key: { SongID }, // Ersetze 'id' durch den Primärschlüssel deiner Tabelle
    };

    try {
        const result = await dynamoDB.get(params).promise();
        console.log("Eintrag gefunden:", result.Item);
        return result.Item;
    } catch (error) {
        console.error("Fehler beim Abrufen des Eintrags:", error);
    }
});


module.exports = { SongRouter };