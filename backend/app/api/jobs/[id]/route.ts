import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/utils/db';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, company, companylogo, salary, location, url } = body;

    const result = await pool.query(
      `UPDATE jobs SET title = $1, company = $2, companylogo = $3, salary = $4, location = $5, url = $6 WHERE id = $7 RETURNING *`,
      [title, company, companylogo, salary, location, url, id]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    console.error(' PUT Error:', error.message);
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
