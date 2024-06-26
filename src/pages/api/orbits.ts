// pages/api/orbits.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { date } = req.query;
    const currentDate = date ? new Date(date.toString()) : new Date();

    const formattedDate = currentDate.toISOString().split('T')[0];

    const { rows } = await sql`SELECT * FROM orbits WHERE date = ${formattedDate}`;

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
