import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { database } from '@repo/database'
import { searchiTunes, type iTunesTrack } from './services/itunes.js'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// iTunes search endpoint
app.get('/search', async (c) => {
  try {
    const searchTerm = c.req.query('term')
    const limitParam = c.req.query('limit')
    
    if (!searchTerm) {
      return c.json({ error: 'Search term is required' }, 400)
    }

    if (searchTerm.trim().length === 0) {
      return c.json({ error: 'Search term cannot be empty' }, 400)
    }

    if (searchTerm.length > 100) {
      return c.json({ error: 'Search term too long (max 100 characters)' }, 400)
    }

    // Validate limit parameter
    let limit = 50
    if (limitParam) {
      const parsedLimit = Number.parseInt(limitParam, 10)
      if (Number.isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 200) {
        return c.json({ error: 'Limit must be a number between 1 and 200' }, 400)
      }
      limit = parsedLimit
    }

    // Search iTunes API
    const iTunesResponse = await searchiTunes(searchTerm, limit)
    
    // Store results in database
    const savedResults = []
    
    for (const track of iTunesResponse.results) {
      try {
        const savedResult = await database.iTunesSearchResult.create({
          data: {
            searchTerm: searchTerm,
            trackId: track.trackId,
            artistName: track.artistName,
            trackName: track.trackName,
            collectionName: track.collectionName,
            artistViewUrl: track.artistViewUrl,
            collectionViewUrl: track.collectionViewUrl,
            trackViewUrl: track.trackViewUrl,
            previewUrl: track.previewUrl,
            artworkUrl30: track.artworkUrl30,
            artworkUrl60: track.artworkUrl60,
            artworkUrl100: track.artworkUrl100,
            collectionPrice: track.collectionPrice,
            trackPrice: track.trackPrice,
            releaseDate: track.releaseDate ? new Date(track.releaseDate) : null,
            collectionExplicitness: track.collectionExplicitness,
            trackExplicitness: track.trackExplicitness,
            discCount: track.discCount,
            discNumber: track.discNumber,
            trackCount: track.trackCount,
            trackNumber: track.trackNumber,
            trackTimeMillis: track.trackTimeMillis,
            country: track.country,
            currency: track.currency,
            primaryGenreName: track.primaryGenreName,
            kind: track.kind,
            wrapperType: track.wrapperType,
          }
        })
        savedResults.push(savedResult)
      } catch (dbError) {
        console.error('Error saving track to database:', dbError)
        // Continue with other tracks even if one fails
      }
    }

    return c.json({
      searchTerm,
      resultCount: iTunesResponse.resultCount,
      savedCount: savedResults.length,
      results: iTunesResponse.results
    })
    
  } catch (error) {
    console.error('Search endpoint error:', error)
    return c.json({ 
      error: 'Internal server error occurred while searching' 
    }, 500)
  }
})

serve({
  fetch: app.fetch,
  port: 3002
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
