import { NextResponse } from "next/server";

// POST /api/orders - Create a new order
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, shipping_address, payment_method, user_id } = body;

    // Validate
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }
    if (!shipping_address) {
      return NextResponse.json({ error: "Shipping address is required" }, { status: 400 });
    }

    // Calculate totals
    const subtotal = items.reduce(
      (acc: number, item: { price: number; quantity: number }) => acc + item.price * item.quantity,
      0
    );
    const shipping = subtotal >= 999 ? 0 : 99;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;

    // Create order object
    const order = {
      id: `SC-${Date.now().toString(36).toUpperCase()}`,
      user_id,
      items,
      subtotal,
      shipping,
      tax,
      total,
      status: "pending",
      payment_method,
      payment_status: payment_method === "cod" ? "pending" : "pending",
      shipping_address,
      created_at: new Date().toISOString(),
    };

    // TODO: Save to Supabase
    // const { data, error } = await supabaseAdmin().from('orders').insert(order);

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

// GET /api/orders - Get all orders (admin) or user orders
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user_id");

    // TODO: Fetch from Supabase
    // if (userId) {
    //   const { data } = await supabase.from('orders').select('*').eq('user_id', userId);
    // }

    return NextResponse.json({ orders: [] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
