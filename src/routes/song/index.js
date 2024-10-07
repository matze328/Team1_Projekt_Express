const { Router } = require('express');
const { StatusCodes } = require('http-status-codes');
const { DynamoDB } = require('aws-sdk');
const dynamoDB = require('../../database/dynamoDB/setup');

const SongRouter = Router();

// Route für alle m4p-Songs
SongRouter.get('/all', async (req, res) => {
    const params = {
        TableName: 'Songs',
    };
    try {
        const result = await dynamoDB.scan(params).promise();
        console.log('Alle Songs gefunden:', result.Items);
        return res.status(200).json(result.Items);
    } catch (error) {
        console.error('Fehler beim Abrufen der Songs:', error);
        return res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

// Route für alle Künstler
SongRouter.get('/artists', async (req, res) => {
    const params = {
        TableName: 'Songs',
    };
    try {
        const result = await dynamoDB.scan(params).promise();
        const artists = [...new Set(result.Items.map(item => item.ArtistName))]; // Eindeutige Künstlernamen extrahieren
        console.log('Künstler gefunden:', artists);
        return res.status(200).json(artists);
    } catch (error) {
        console.error('Fehler beim Abrufen der Künstler:', error);
        return res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

// Route für Alben eines bestimmten Künstlers
SongRouter.get('/albums/:artist', async (req, res) => {
    const artist = req.params.artist;
    const params = {
        TableName: 'Songs',
        FilterExpression: 'ArtistName = :artist',
        ExpressionAttributeValues: {
            ':artist': artist,
        },
    };

    try {
        const result = await dynamoDB.scan(params).promise();
        const albums = [...new Set(result.Items.map(item => item.AlbumName))]; // Eindeutige Albumnamen extrahieren
        console.log(`Alben für ${artist} gefunden:`, albums);
        return res.status(200).json(albums);
    } catch (error) {
        console.error('Fehler beim Abrufen der Alben:', error);
        return res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

// Route für Songs eines bestimmten Albums eines Künstlers
SongRouter.get('/songs/:artist/:album', async (req, res) => {
    const { artist, album } = req.params;

    const params = {
        TableName: 'Songs',
        FilterExpression: 'ArtistName = :artist AND AlbumName = :album',
        ExpressionAttributeValues: {
            ':artist': artist,
            ':album': album,
        },
    };

    try {
        const result = await dynamoDB.scan(params).promise();

        if (result.Items.length > 0) {
            console.log(`Songs für ${album} von ${artist} gefunden:`, result.Items);
            return res.status(200).json(result.Items.map(item => item)); // Hier kannst du auch andere Felder zurückgeben
        } else {
            console.log(`Keine Songs gefunden für ${album} von ${artist}`);
            return res.status(404).json({ message: 'Keine Songs gefunden' });
        }

    } catch (error) {
        console.error('Fehler beim Abrufen der Songs:', error);
        return res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

module.exports = { SongRouter };