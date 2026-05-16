import { NextResponse } from "next/server";

// GET /api/products - Get all products
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "50");

    // TODO: Fetch from Supabase with filters
    // let query = supabase.from('products').select('*, category:categories(*)');
    // if (category) query = query.eq('categories.slug', category);
    // if (search) query = query.ilike('name', `%${search}%`);
    // if (featured) query = query.eq('featured', true);
    // query = query.limit(limit);
    // const { data, error } = await query;

    return NextResponse.json({ products: [] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST /api/products - Create a new product (admin)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // TODO: Validate and save to Supabase
    // const { data, error } = await supabaseAdmin().from('products').insert(body);

    return NextResponse.json({ success: true, product: body }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
