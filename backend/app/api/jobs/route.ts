import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/utils/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM jobs ORDER BY id DESC');
    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error('GET Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, company, companylogo, salary, location, url, jobtype } = body;

    const result = await pool.query(
      `INSERT INTO jobs (title, company, companylogo, salary, location, url, jobtype)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, company, companylogo, salary, location, url, jobtype]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    console.error('POST Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
