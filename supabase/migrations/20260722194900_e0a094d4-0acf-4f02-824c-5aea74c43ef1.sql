DROP POLICY IF EXISTS "Anyone can submit a review" ON public.reviews;
CREATE POLICY "Anyone can submit a valid review" ON public.reviews
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 80
  AND rating BETWEEN 1 AND 5
  AND length(btrim(comment)) BETWEEN 1 AND 300
  AND (visit_date IS NULL OR visit_date <= CURRENT_DATE)
);