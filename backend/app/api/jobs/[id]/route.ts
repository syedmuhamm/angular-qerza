import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/utils/db';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
      // Await params to ensure they are resolved
      const { id } = await params; // Await params before destructuring
  
      const body = await request.json();
      const { title, company, companylogo, salary, location, url, jobtype } = body;
  
      const result = await pool.query(
        `UPDATE jobs SET title = $1, company = $2, companylogo = $3, salary = $4, location = $5, url = $6, jobtype = $7 WHERE id = $8 RETURNING *`,
        [title, company, companylogo, salary, location, url, jobtype, id]
      );
  
      return NextResponse.json(result.rows[0]);
    } catch (error: any) {
      console.error('PUT Error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await pool.query('DELETE FROM jobs WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(' DELETE Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
