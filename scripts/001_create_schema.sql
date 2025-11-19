-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT CHECK (role IN ('model', 'agency', 'client', 'photographer', 'stylist', 'admin')) DEFAULT 'model',
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  languages TEXT[] DEFAULT ARRAY['english'],
  verified BOOLEAN DEFAULT FALSE,
  kyc_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Model profiles
CREATE TABLE IF NOT EXISTS public.model_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  height DECIMAL(5,2),
  bust DECIMAL(5,2),
  waist DECIMAL(5,2),
  hips DECIMAL(5,2),
  chest DECIMAL(5,2),
  shoe_size TEXT,
  hair_color TEXT,
  eye_color TEXT,
  skin_tone TEXT,
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'professional', 'expert')),
  specializations TEXT[] DEFAULT ARRAY[]::TEXT[],
  portfolio_images TEXT[] DEFAULT ARRAY[]::TEXT[],
  comp_card_url TEXT,
  video_intro_url TEXT,
  hourly_rate DECIMAL(10,2),
  daily_rate DECIMAL(10,2),
  available BOOLEAN DEFAULT TRUE,
  state TEXT,
  region TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  title_te TEXT,
  description TEXT,
  description_te TEXT,
  event_type TEXT CHECK (event_type IN ('fashion_show', 'photoshoot', 'casting', 'training', 'workshop', 'competition')),
  location TEXT,
  venue TEXT,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  organizer_id UUID REFERENCES public.profiles(id),
  banner_image TEXT,
  gallery_images TEXT[] DEFAULT ARRAY[]::TEXT[],
  max_participants INTEGER,
  registration_fee DECIMAL(10,2) DEFAULT 0,
  status TEXT CHECK (status IN ('draft', 'published', 'ongoing', 'completed', 'cancelled')) DEFAULT 'draft',
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Casting calls
CREATE TABLE IF NOT EXISTS public.casting_calls (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  title_te TEXT,
  description TEXT,
  description_te TEXT,
  client_id UUID REFERENCES public.profiles(id),
  project_type TEXT,
  requirements JSONB,
  location TEXT,
  shoot_date TIMESTAMP WITH TIME ZONE,
  compensation DECIMAL(10,2),
  compensation_type TEXT CHECK (compensation_type IN ('paid', 'tfp', 'negotiable')),
  deadline TIMESTAMP WITH TIME ZONE,
  status TEXT CHECK (status IN ('open', 'closed', 'filled')) DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications for casting calls
CREATE TABLE IF NOT EXISTS public.casting_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  casting_id UUID REFERENCES public.casting_calls(id) ON DELETE CASCADE,
  model_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  cover_letter TEXT,
  portfolio_links TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT CHECK (status IN ('pending', 'shortlisted', 'rejected', 'accepted')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(casting_id, model_id)
);

-- Training courses
CREATE TABLE IF NOT EXISTS public.training_courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  title_te TEXT,
  description TEXT,
  description_te TEXT,
  instructor_id UUID REFERENCES public.profiles(id),
  category TEXT,
  level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  duration_hours INTEGER,
  price DECIMAL(10,2),
  thumbnail_url TEXT,
  video_url TEXT,
  ai_generated BOOLEAN DEFAULT FALSE,
  modules JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fashion rental items
CREATE TABLE IF NOT EXISTS public.rental_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  title_te TEXT,
  description TEXT,
  description_te TEXT,
  category TEXT CHECK (category IN ('traditional', 'western', 'accessories', 'shoes', 'props')),
  subcategory TEXT,
  size TEXT,
  color TEXT,
  brand TEXT,
  condition TEXT CHECK (condition IN ('new', 'excellent', 'good', 'fair')),
  daily_rate DECIMAL(10,2),
  security_deposit DECIMAL(10,2),
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  available BOOLEAN DEFAULT TRUE,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id),
  model_id UUID REFERENCES public.profiles(id),
  booking_type TEXT CHECK (booking_type IN ('photoshoot', 'event', 'training', 'rental')),
  reference_id UUID,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  total_amount DECIMAL(10,2),
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
  payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'refunded')) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Chat conversations
CREATE TABLE IF NOT EXISTS public.chat_conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  title TEXT,
  messages JSONB DEFAULT '[]'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews and ratings
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reviewer_id UUID REFERENCES public.profiles(id),
  reviewee_id UUID REFERENCES public.profiles(id),
  booking_id UUID REFERENCES public.bookings(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(reviewer_id, reviewee_id, booking_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.casting_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.casting_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles (public read, own write)
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for model_profiles
CREATE POLICY "Model profiles are viewable by everyone" ON public.model_profiles
  FOR SELECT USING (true);

CREATE POLICY "Models can update own profile" ON public.model_profiles
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for events
CREATE POLICY "Events are viewable by everyone" ON public.events
  FOR SELECT USING (status = 'published' OR organizer_id = auth.uid());

CREATE POLICY "Organizers can manage own events" ON public.events
  FOR ALL USING (auth.uid() = organizer_id);

-- RLS Policies for casting_calls
CREATE POLICY "Open casting calls are viewable by everyone" ON public.casting_calls
  FOR SELECT USING (status = 'open' OR client_id = auth.uid());

CREATE POLICY "Clients can manage own casting calls" ON public.casting_calls
  FOR ALL USING (auth.uid() = client_id);

-- RLS Policies for casting_applications
CREATE POLICY "Users can view own applications" ON public.casting_applications
  FOR SELECT USING (auth.uid() = model_id OR auth.uid() IN (
    SELECT client_id FROM public.casting_calls WHERE id = casting_id
  ));

CREATE POLICY "Models can create applications" ON public.casting_applications
  FOR INSERT WITH CHECK (auth.uid() = model_id);

-- RLS Policies for training_courses
CREATE POLICY "Training courses are viewable by everyone" ON public.training_courses
  FOR SELECT USING (true);

CREATE POLICY "Instructors can manage own courses" ON public.training_courses
  FOR ALL USING (auth.uid() = instructor_id);

-- RLS Policies for rental_items
CREATE POLICY "Available rental items are viewable by everyone" ON public.rental_items
  FOR SELECT USING (available = true OR owner_id = auth.uid());

CREATE POLICY "Owners can manage own rental items" ON public.rental_items
  FOR ALL USING (auth.uid() = owner_id);

-- RLS Policies for bookings
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = client_id OR auth.uid() = model_id);

CREATE POLICY "Clients can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = client_id);

-- RLS Policies for chat_conversations
CREATE POLICY "Users can view own conversations" ON public.chat_conversations
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for reviews
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for completed bookings" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- Create indexes for better performance
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_model_profiles_user_id ON public.model_profiles(user_id);
CREATE INDEX idx_model_profiles_available ON public.model_profiles(available);
CREATE INDEX idx_events_status ON public.events(status);
CREATE INDEX idx_events_start_date ON public.events(start_date);
CREATE INDEX idx_casting_calls_status ON public.casting_calls(status);
CREATE INDEX idx_casting_applications_model_id ON public.casting_applications(model_id);
CREATE INDEX idx_bookings_client_id ON public.bookings(client_id);
CREATE INDEX idx_bookings_model_id ON public.bookings(model_id);
CREATE INDEX idx_reviews_reviewee_id ON public.reviews(reviewee_id);
