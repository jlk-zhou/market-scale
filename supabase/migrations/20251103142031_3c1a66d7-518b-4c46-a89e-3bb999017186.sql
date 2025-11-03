-- Fix function search path for handle_updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Enable RLS on stocks table
ALTER TABLE public.stocks ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read stocks (public data)
CREATE POLICY "Anyone can view stocks"
  ON public.stocks
  FOR SELECT
  USING (true);

-- Enable RLS on sectors table
ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read sectors (public data)
CREATE POLICY "Anyone can view sectors"
  ON public.sectors
  FOR SELECT
  USING (true);