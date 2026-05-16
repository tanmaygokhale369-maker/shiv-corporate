import { NextResponse } from "next/server";

// POST /api/enquiries - Create a new enquiry
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message, product_id } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const enquiry = {
      id: `enq_${Date.now()}`,
      name,
      email,
      phone: phone || "",
      company: company || "",
      message,
      product_id: product_id || null,
      status: "new",
      created_at: new Date().toISOString(),
    };

    // TODO: Save to Supabase
    // const { data, error } = await supabaseAdmin().from('enquiries').insert(enquiry);

    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create enquiry" }, { status: 500 });
  }
}

// GET /api/enquiries - Get all enquiries (admin only)
export async function GET() {
  try {
    // TODO: Fetch from Supabase
    return NextResponse.json({ enquiries: [] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}
