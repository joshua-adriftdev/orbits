// pages/api/orbits.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { date } = req.query;
    
    // Check if the date parameter is provided
    if (!date || typeof date !== 'string') {
      return res.status(400).json({ error: 'Date parameter is missing or invalid' });
    }

    // Fetch the row from the database where the date matches
    const { rows } = await sql`SELECT * FROM orbits WHERE date = ${date}`;
    
    // Check if any rows are found
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No data found for the specified date' });
    }

    // Return the fetched row
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
