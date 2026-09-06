-- Replace policy usage of the SECURITY DEFINER function with an inline check
DROP POLICY IF EXISTS "Admins can view whatsapp clicks" ON public.whatsapp_clicks;

CREATE POLICY "Admins can view whatsapp clicks"
ON public.whatsapp_clicks
FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles
  WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'::public.app_role
));

-- Signed-in users must not be able to call the SECURITY DEFINER helper directly
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;