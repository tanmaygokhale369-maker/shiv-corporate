-- =============================================
-- SHIV CORPORATE SOLUTION - DATABASE SCHEMA
-- Supabase PostgreSQL
-- =============================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- CATEGORIES TABLE
-- =============================================
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  image TEXT DEFAULT '',
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PRODUCTS TABLE
-- =============================================
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  short_description VARCHAR(500) DEFAULT '',
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  offer_price DECIMAL(10, 2),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  images TEXT[] DEFAULT '{}',
  variants JSONB DEFAULT '[]',
  in_stock BOOLEAN DEFAULT TRUE,
  stock_quantity INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- USER PROFILES TABLE (extends Supabase auth.users)
-- =============================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255),
  full_name VARCHAR(255) DEFAULT '',
  phone VARCHAR(20) DEFAULT '',
  avatar_url TEXT DEFAULT '',
  role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  addresses JSONB DEFAULT '[]',
  wishlist UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ORDERS TABLE
-- =============================================
CREATE TABLE orders (
  id VARCHAR(50) PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0,
  shipping DECIMAL(10, 2) DEFAULT 0,
  tax DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned')),
  payment_method VARCHAR(20) DEFAULT 'cod' CHECK (payment_method IN ('razorpay', 'upi', 'cod')),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_id VARCHAR(255),
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ENQUIRIES TABLE
-- =============================================
CREATE TABLE enquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) DEFAULT '',
  company VARCHAR(255) DEFAULT '',
  message TEXT NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TESTIMONIALS TABLE
-- =============================================
CREATE TABLE testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255) DEFAULT '',
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  avatar TEXT DEFAULT '',
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- BANNERS TABLE
-- =============================================
CREATE TABLE banners (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) DEFAULT '',
  subtitle TEXT DEFAULT '',
  image TEXT NOT NULL,
  cta_text VARCHAR(100) DEFAULT '',
  cta_link VARCHAR(500) DEFAULT '',
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- GALLERY TABLE
-- =============================================
CREATE TABLE gallery (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  url TEXT NOT NULL,
  caption VARCHAR(500) DEFAULT '',
  category VARCHAR(100) DEFAULT '',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- SITE SETTINGS TABLE (single row)
-- =============================================
CREATE TABLE site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  whatsapp_number VARCHAR(20) DEFAULT '919930469954',
  phone_numbers TEXT[] DEFAULT ARRAY['9930469954', '8591639892'],
  email VARCHAR(255) DEFAULT 'shivcorporate93@gmail.com',
  address TEXT DEFAULT 'Mumbai, Maharashtra, India',
  about_text TEXT DEFAULT '',
  social_links JSONB DEFAULT '{}',
  upi_id VARCHAR(100) DEFAULT 'suresh.patel11244@okicici',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- FAQ TABLE
-- =============================================
CREATE TABLE faqs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_in_stock ON products(in_stock);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_enquiries_status ON enquiries(status);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Products: Public read, Admin write
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Products are manageable by admins" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Categories: Public read, Admin write
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Categories are manageable by admins" ON categories FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Orders: Users see own, Admin sees all
CREATE POLICY "Users see own orders" ON orders FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins see all orders" ON orders FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can update orders" ON orders FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Profiles: Users manage own
CREATE POLICY "Users manage own profile" ON profiles FOR ALL USING (id = auth.uid());
CREATE POLICY "Admins see all profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Public read for remaining tables
CREATE POLICY "Testimonials are public" ON testimonials FOR SELECT USING (active = true);
CREATE POLICY "Banners are public" ON banners FOR SELECT USING (active = true);
CREATE POLICY "Gallery is public" ON gallery FOR SELECT USING (true);
CREATE POLICY "FAQs are public" ON faqs FOR SELECT USING (active = true);
CREATE POLICY "Settings are public" ON site_settings FOR SELECT USING (true);

-- Enquiries: Anyone can create, admin reads
CREATE POLICY "Anyone can submit enquiry" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins see enquiries" ON enquiries FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- =============================================
-- TRIGGER: Auto-update updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- TRIGGER: Auto-create profile on user signup
-- =============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- =============================================
-- SEED DATA: Default categories
-- =============================================
INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Housekeeping Products', 'housekeeping', 'Professional cleaning supplies and maintenance tools', 1),
  ('Corporate Gifts', 'corporate-gifts', 'Premium branded gifts for clients, partners and employees', 2),
  ('Office Products', 'office-products', 'Essential office supplies and workspace accessories', 3),
  ('Combo Kits', 'combo-kits', 'Curated product bundles at special pricing', 4),
  ('Utility Products', 'utility-products', 'Everyday utility items for offices and corporate spaces', 5),
  ('Promotional Products', 'promotional', 'Custom branded merchandise for marketing campaigns', 6);

-- Seed default settings
INSERT INTO site_settings (whatsapp_number, email, address, about_text) VALUES
  ('919930469954', 'shivcorporate93@gmail.com', 'Mumbai, Maharashtra, India', 'Shiv Corporate Solution is India''s trusted partner for premium corporate gifts, housekeeping products, and office supplies. Delivering quality across India with trusted service.');

-- Seed default FAQs
INSERT INTO faqs (question, answer, display_order) VALUES
  ('What types of products does Shiv Corporate offer?', 'We offer housekeeping supplies, corporate gifts, office products, promotional merchandise, combo kits, and custom branded items.', 1),
  ('Do you offer bulk pricing?', 'Yes! We specialize in bulk orders and offer competitive wholesale pricing. Contact us for a customized quote.', 2),
  ('Can you customize products with our company logo?', 'Absolutely! We offer custom branding on most products. Minimum order quantities may apply.', 3),
  ('Do you deliver across India?', 'Yes, we deliver to all states and union territories across India. Orders above ₹999 qualify for free shipping.', 4);
