DROP POLICY "Admins can view leads" ON public.leads;

CREATE POLICY "Admins can view leads"
ON public.leads FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles
  WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'
));

REVOKE ALL ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(UUID, public.app_role) FROM anon;
REVOKE ALL ON FUNCTION public.has_role(UUID, public.app_role) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO service_role;