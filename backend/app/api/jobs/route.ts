import { NextRequest, NextResponse } from 'next/server';
import pool from "@/app/utils/db";

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM jobs');
    return NextResponse.json(result.rows); // Return query results
  } catch (error: any) {
    console.error('Database error:', error.message, error.stack); // Log error details
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, company, companylogo, salary, location, url } = body;

    const result = await pool.query(
      `INSERT INTO jobs (title, company, companylogo, salary, location, url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, company, companylogo, salary, location, url]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    console.error('Database error:', error.message, error.stack);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

