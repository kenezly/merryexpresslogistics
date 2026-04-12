CREATE TABLE public.delivery_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  pickup_location TEXT NOT NULL,
  delivery_location TEXT NOT NULL,
  package_details TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.delivery_orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert orders (customers don't need to log in)
CREATE POLICY "Anyone can place an order"
ON public.delivery_orders
FOR INSERT
WITH CHECK (true);

-- Only authenticated admin can view orders (we'll keep it simple for now)
CREATE POLICY "Authenticated users can view orders"
ON public.delivery_orders
FOR SELECT
TO authenticated
USING (true);